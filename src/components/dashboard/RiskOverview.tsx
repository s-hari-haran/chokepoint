import { useMemo } from 'react';
import type { Metal, CountrySupply, IndustryDependency } from '@/types/chokepoint';
import { calculateRiskScore, getRiskLevel } from '@/lib/risk-calculator';
import { RiskBadge } from './RiskBadge';

interface RiskOverviewProps {
  metals: Metal[];
  allSupplies: Array<CountrySupply & { metals: { name: string } | null }>;
  allDependencies: Array<{ metal_id: string; industry: string; dependency_score: number; metals: { name: string } | null }>;
}

export function RiskOverview({ metals, allSupplies, allDependencies }: RiskOverviewProps) {
  const metalRisks = useMemo(() => {
    return metals.map((metal) => {
      const supplies = allSupplies.filter((s) => s.metal_id === metal.id);
      const deps = allDependencies.filter((d) => d.metal_id === metal.id);
      
      const maxConcentration = supplies.length > 0
        ? Math.max(...supplies.map((s) => Number(s.percent_control)))
        : 0;
      
      const maxDependency = deps.length > 0
        ? Math.max(...deps.map((d) => d.dependency_score))
        : 0;

      const overallRisk = calculateRiskScore(maxConcentration, maxDependency);

      return {
        id: metal.id,
        name: metal.name,
        symbol: metal.symbol,
        maxConcentration,
        maxDependency,
        overallRisk,
        riskLevel: getRiskLevel(overallRisk),
      };
    }).sort((a, b) => b.overallRisk - a.overallRisk);
  }, [metals, allSupplies, allDependencies]);

  return (
    <div className="border-brutal-3 bg-background p-4 shadow-brutal">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-foreground pb-2">
        Risk Overview
      </h3>

      <div className="grid gap-3">
        {metalRisks.map((metal) => (
          <div
            key={metal.id}
            className="flex items-center justify-between border-brutal p-3"
          >
            <div>
              <span className="font-bold">{metal.symbol}</span>
              <span className="text-muted-foreground ml-2">{metal.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-xs text-muted-foreground hidden sm:block">
                <div>Concentration: {metal.maxConcentration.toFixed(0)}%</div>
                <div>Max Dependency: {metal.maxDependency}/5</div>
              </div>
              <RiskBadge level={metal.riskLevel} score={metal.overallRisk} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t-2 border-foreground space-y-1">
        <p className="text-xs text-muted-foreground font-mono">
          Risk Score = Supply Concentration × Industry Dependency
        </p>
        <div className="flex gap-4 text-xs">
          <span>0–1.5: Low</span>
          <span>1.5–3.0: Moderate</span>
          <span>3.0+: High</span>
        </div>
      </div>
    </div>
  );
}
