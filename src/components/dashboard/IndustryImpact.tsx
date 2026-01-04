import type { IndustryDependency } from '@/types/chokepoint';
import { INDUSTRY_LABELS } from '@/types/chokepoint';

interface IndustryImpactProps {
  dependencies: IndustryDependency[];
}

export function IndustryImpact({ dependencies }: IndustryImpactProps) {
  const getSeverityBars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-4 h-6 border-brutal ${
          i < score ? 'bg-foreground' : 'bg-secondary'
        }`}
      />
    ));
  };

  const getSeverityLabel = (score: number) => {
    if (score >= 5) return 'Critical';
    if (score >= 4) return 'High';
    if (score >= 3) return 'Moderate';
    if (score >= 2) return 'Low';
    return 'Minimal';
  };

  return (
    <div className="border-brutal-3 bg-background p-4 shadow-brutal">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-foreground pb-2">
        Industry Dependency
      </h3>

      <div className="space-y-4">
        {dependencies.map((dep) => (
          <div key={dep.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold">{INDUSTRY_LABELS[dep.industry]}</span>
              <span className="text-xs font-mono uppercase text-muted-foreground">
                {getSeverityLabel(dep.dependency_score)}
              </span>
            </div>
            
            <div className="flex gap-1">{getSeverityBars(dep.dependency_score)}</div>
            
            {dep.rationale && (
              <p className="text-xs text-muted-foreground">{dep.rationale}</p>
            )}
          </div>
        ))}

        {dependencies.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No dependency data available</p>
        )}
      </div>
    </div>
  );
}
