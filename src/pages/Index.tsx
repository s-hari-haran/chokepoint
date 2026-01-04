import { useState, useMemo, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MetalSelector } from '@/components/dashboard/MetalSelector';
import { SupplyConcentration } from '@/components/dashboard/SupplyConcentration';
import { IndustryImpact } from '@/components/dashboard/IndustryImpact';
import { ChokePointAlerts } from '@/components/dashboard/ChokePointAlerts';
import { ExposureRanking } from '@/components/dashboard/ExposureRanking';
import { SignalTimeline } from '@/components/dashboard/SignalTimeline';
import { RiskOverview } from '@/components/dashboard/RiskOverview';
import { HelpGuide } from '@/components/dashboard/HelpGuide';
import {
  useMetals,
  useCountrySupply,
  useIndustryDependency,
  useChokePoints,
  useNewsUpdates,
  useAllCountrySupplies,
  useAllIndustryDependencies,
} from '@/hooks/useMetals';
import { calculateRiskScore, getRiskLevel, getMaxSupplyConcentration } from '@/lib/risk-calculator';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [selectedMetalId, setSelectedMetalId] = useState<string | null>(null);

  // Queries
  const { data: metals = [], isLoading: metalsLoading } = useMetals();
  const { data: countrySupply = [] } = useCountrySupply(selectedMetalId);
  const { data: industryDependency = [] } = useIndustryDependency(selectedMetalId);
  const { data: chokePoints = [] } = useChokePoints(selectedMetalId);
  const { data: newsUpdates = [] } = useNewsUpdates(null, 15);
  const { data: allSupplies = [] } = useAllCountrySupplies();
  const { data: allDependencies = [] } = useAllIndustryDependencies();

  // Auto-select first metal when loaded
  useEffect(() => {
    if (metals.length > 0 && !selectedMetalId) {
      setSelectedMetalId(metals[0].id);
    }
  }, [metals, selectedMetalId]);

  // Compute risk for selected metal
  const selectedMetalRisk = useMemo(() => {
    if (!selectedMetalId || countrySupply.length === 0 || industryDependency.length === 0) {
      return null;
    }

    const maxSupply = getMaxSupplyConcentration(countrySupply);
    const maxDep = Math.max(...industryDependency.map((d) => d.dependency_score));
    const score = calculateRiskScore(maxSupply.percent, maxDep);

    return {
      score,
      level: getRiskLevel(score),
    };
  }, [selectedMetalId, countrySupply, industryDependency]);

  // Last refresh from newest news item
  const lastRefresh = useMemo(() => {
    if (newsUpdates.length === 0) return null;
    return new Date(newsUpdates[0].scraped_at);
  }, [newsUpdates]);

  if (metalsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-brutal-4 border-b-4 bg-background p-6">
          <Skeleton className="h-12 w-64" />
        </div>
        <div className="p-6">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader lastRefresh={lastRefresh} />

      <main className="p-4 md:p-6 space-y-6">
        {/* Metal Selector */}
        <section>
          <MetalSelector
            metals={metals}
            selectedMetalId={selectedMetalId}
            onSelect={setSelectedMetalId}
            riskLevel={selectedMetalRisk?.level}
            riskScore={selectedMetalRisk?.score}
          />
        </section>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Supply Concentration */}
          <SupplyConcentration supplies={countrySupply} />

          {/* Industry Impact */}
          <IndustryImpact dependencies={industryDependency} />

          {/* Choke Point Alerts */}
          <ChokePointAlerts chokePoints={chokePoints} />
        </div>

        {/* Exposure Ranking - Full Width */}
        <ExposureRanking
          metals={metals}
          allSupplies={allSupplies}
          allDependencies={allDependencies}
        />

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Risk Overview */}
          <RiskOverview
            metals={metals}
            allSupplies={allSupplies}
            allDependencies={allDependencies}
          />

          {/* Signal Timeline */}
          <SignalTimeline news={newsUpdates} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-foreground p-4 text-center text-xs text-muted-foreground font-mono">
        <p>CHOKEPOINT — Critical Materials Risk Dashboard</p>
        <p className="mt-1">Data sources: USGS, Reuters, Mining.com, MOFCOM</p>
      </footer>

      {/* Help Guide */}
      <HelpGuide />
    </div>
  );
};

export default Index;
