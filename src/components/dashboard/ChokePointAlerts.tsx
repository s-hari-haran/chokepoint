import { AlertTriangle, Ban, Truck } from 'lucide-react';
import type { ChokePoint } from '@/types/chokepoint';
import { CHOKE_TYPE_LABELS } from '@/types/chokepoint';

interface ChokePointAlertsProps {
  chokePoints: ChokePoint[];
}

export function ChokePointAlerts({ chokePoints }: ChokePointAlertsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'export_control':
        return <Ban className="h-4 w-4" />;
      case 'logistics':
        return <Truck className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityIndicator = (severity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`w-2 h-2 rounded-full ${
          i < severity ? 'bg-risk-high' : 'bg-secondary'
        }`}
      />
    ));
  };

  const activeAlerts = chokePoints.filter((cp) => cp.active);

  return (
    <div className="border-brutal-3 bg-background p-4 shadow-brutal">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-foreground pb-2 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Active Choke Points
        <span className="ml-auto font-mono text-risk-high">{activeAlerts.length}</span>
      </h3>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {activeAlerts.map((cp) => (
          <div key={cp.id} className="border-brutal p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                {getIcon(cp.type)}
                <span className="text-xs font-bold uppercase bg-secondary px-2 py-0.5">
                  {CHOKE_TYPE_LABELS[cp.type]}
                </span>
              </div>
              <div className="flex gap-0.5">{getSeverityIndicator(cp.severity)}</div>
            </div>

            <p className="text-sm">{cp.description}</p>

            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="font-mono uppercase">{cp.country_code}</span>
              {cp.source_url && (
                <a
                  href={cp.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  Source
                </a>
              )}
            </div>
          </div>
        ))}

        {activeAlerts.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No active alerts</p>
        )}
      </div>
    </div>
  );
}
