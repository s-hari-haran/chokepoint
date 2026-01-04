import { cn } from '@/lib/utils';
import { getRiskColor } from '@/lib/risk-calculator';
import type { RiskLevel } from '@/types/chokepoint';

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  className?: string;
}

export function RiskBadge({ level, score, className }: RiskBadgeProps) {
  const labels: Record<RiskLevel, string> = {
    high: 'HIGH RISK',
    moderate: 'MODERATE',
    low: 'LOW RISK',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase border-brutal tracking-wider',
        getRiskColor(level),
        className
      )}
    >
      {labels[level]}
      {score !== undefined && (
        <span className="font-mono">({score.toFixed(2)})</span>
      )}
    </span>
  );
}
