import { useMemo } from 'react';
import type { Metal, CountrySupply, IndustryDependency } from '@/types/chokepoint';
import { INDUSTRY_LABELS } from '@/types/chokepoint';
import { calculateRiskScore, getRiskLevel, getMaxSupplyConcentration } from '@/lib/risk-calculator';
import { RiskBadge } from './RiskBadge';

interface ExposureRankingProps {
  metals: Metal[];
  allSupplies: Array<CountrySupply & { metals: { name: string } | null }>;
  allDependencies: Array<{ metal_id: string; industry: string; dependency_score: number; metals: { name: string } | null }>;
}

interface RankedExposure {
  id: string;
  industry: string;
  metalName: string;
  riskScore: number;
  topSupplier: string;
  topSupplierPercent: number;
}

export function ExposureRanking({ metals, allSupplies, allDependencies }: ExposureRankingProps) {
  const rankings = useMemo(() => {
    const exposures: RankedExposure[] = [];

    for (const metal of metals) {
      const metalSupplies = allSupplies.filter((s) => s.metal_id === metal.id);
      const metalDeps = allDependencies.filter((d) => d.metal_id === metal.id);
      const maxSupply = getMaxSupplyConcentration(metalSupplies);

      for (const dep of metalDeps) {
        const score = calculateRiskScore(maxSupply.percent, dep.dependency_score);
        exposures.push({
          id: `${metal.id}-${dep.industry}`,
          industry: dep.industry,
          metalName: metal.name,
          riskScore: score,
          topSupplier: maxSupply.country,
          topSupplierPercent: maxSupply.percent,
        });
      }
    }

    return exposures.sort((a, b) => b.riskScore - a.riskScore).slice(0, 10);
  }, [metals, allSupplies, allDependencies]);

  return (
    <div className="border-brutal-3 bg-background p-4 shadow-brutal">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-foreground pb-2">
        Exposure Ranking
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Industries ranked by vulnerability if dominant supplier restricts exports
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-foreground">
              <th className="text-left py-2 font-bold">#</th>
              <th className="text-left py-2 font-bold">Industry</th>
              <th className="text-left py-2 font-bold">Metal</th>
              <th className="text-left py-2 font-bold">Top Supplier</th>
              <th className="text-right py-2 font-bold">Risk</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((item, index) => (
              <tr key={item.id} className="border-b border-secondary">
                <td className="py-2 font-mono font-bold">{index + 1}</td>
                <td className="py-2 font-medium">{INDUSTRY_LABELS[item.industry]}</td>
                <td className="py-2">{item.metalName}</td>
                <td className="py-2">
                  <span className="font-medium">{item.topSupplier}</span>
                  <span className="text-muted-foreground ml-1 font-mono">
                    ({item.topSupplierPercent.toFixed(0)}%)
                  </span>
                </td>
                <td className="py-2 text-right">
                  <RiskBadge level={getRiskLevel(item.riskScore)} score={item.riskScore} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rankings.length === 0 && (
          <p className="text-sm text-muted-foreground italic py-4">No data available</p>
        )}
      </div>
    </div>
  );
}
