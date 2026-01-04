import type { CountrySupply } from '@/types/chokepoint';

interface SupplyConcentrationProps {
  supplies: CountrySupply[];
}

export function SupplyConcentration({ supplies }: SupplyConcentrationProps) {
  const maxPercent = Math.max(...supplies.map((s) => Number(s.percent_control)), 1);

  return (
    <div className="border-brutal-3 bg-background p-4 shadow-brutal">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-foreground pb-2">
        Supply Concentration
      </h3>
      
      <div className="space-y-3">
        {supplies.map((supply, index) => {
          const percent = Number(supply.percent_control);
          const barWidth = (percent / maxPercent) * 100;
          const isTop3 = index < 3;

          return (
            <div key={supply.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className={isTop3 ? 'font-bold' : 'font-medium'}>
                  {supply.country_name}
                  <span className="text-muted-foreground ml-1">({supply.country_code})</span>
                </span>
                <span className="font-mono font-bold">{percent.toFixed(1)}%</span>
              </div>
              <div className="h-4 bg-secondary border-brutal w-full">
                <div
                  className={`h-full ${isTop3 ? 'bg-foreground' : 'bg-muted-foreground'}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}

        {supplies.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No supply data available</p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t-2 border-foreground">
        <p className="text-xs text-muted-foreground font-mono">
          Source: USGS Mineral Commodity Summaries {supplies[0]?.year || 2024}
        </p>
      </div>
    </div>
  );
}
