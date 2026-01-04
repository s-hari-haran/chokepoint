import type { RiskLevel, ComputedRiskScore, CountrySupply, IndustryDependency } from '@/types/chokepoint';

/**
 * Risk Score Formula:
 * Risk Score = Supply Concentration × Industry Dependency
 * 
 * Where:
 * - Supply Concentration = max(percent_control) / 100 (0 to 1)
 * - Industry Dependency = dependency_score (1 to 5)
 * 
 * Result range: 0.01 to 5.0
 * 
 * Score Bands:
 * - 0–1.5: Low Risk
 * - 1.5–3.0: Moderate Risk
 * - 3.0+: High Risk
 */

export function calculateRiskScore(
  supplyConcentration: number,
  dependencyScore: number
): number {
  const normalized = supplyConcentration / 100;
  return Math.round(normalized * dependencyScore * 100) / 100;
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 3.0) return 'high';
  if (score >= 1.5) return 'moderate';
  return 'low';
}

export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case 'high':
      return 'bg-risk-high text-risk-high-foreground';
    case 'moderate':
      return 'bg-risk-moderate text-risk-moderate-foreground';
    case 'low':
      return 'bg-risk-low text-risk-low-foreground';
  }
}

export function getRiskBorderColor(level: RiskLevel): string {
  switch (level) {
    case 'high':
      return 'border-[hsl(var(--risk-high))]';
    case 'moderate':
      return 'border-[hsl(var(--risk-moderate))]';
    case 'low':
      return 'border-[hsl(var(--risk-low))]';
  }
}

export function getMaxSupplyConcentration(supplies: CountrySupply[]): {
  percent: number;
  country: string;
  countryCode: string;
} {
  if (supplies.length === 0) {
    return { percent: 0, country: 'Unknown', countryCode: 'XX' };
  }

  const max = supplies.reduce((prev, curr) =>
    Number(curr.percent_control) > Number(prev.percent_control) ? curr : prev
  );

  return {
    percent: Number(max.percent_control),
    country: max.country_name,
    countryCode: max.country_code,
  };
}

export function computeRiskScores(
  metalId: string,
  metalName: string,
  supplies: CountrySupply[],
  dependencies: IndustryDependency[]
): ComputedRiskScore[] {
  const maxConcentration = getMaxSupplyConcentration(supplies);

  return dependencies.map((dep) => {
    const riskScore = calculateRiskScore(maxConcentration.percent, dep.dependency_score);
    return {
      metal_id: metalId,
      metal_name: metalName,
      industry: dep.industry,
      supply_concentration: maxConcentration.percent,
      dependency_score: dep.dependency_score,
      risk_score: riskScore,
      risk_level: getRiskLevel(riskScore),
    };
  });
}
