import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Metal } from '@/types/chokepoint';
import { RiskBadge } from './RiskBadge';
import type { RiskLevel } from '@/types/chokepoint';

interface MetalSelectorProps {
  metals: Metal[];
  selectedMetalId: string | null;
  onSelect: (metalId: string) => void;
  riskLevel?: RiskLevel;
  riskScore?: number;
}

export function MetalSelector({
  metals,
  selectedMetalId,
  onSelect,
  riskLevel,
  riskScore,
}: MetalSelectorProps) {
  const selectedMetal = metals.find((m) => m.id === selectedMetalId);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <Select value={selectedMetalId || ''} onValueChange={onSelect}>
        <SelectTrigger className="w-full sm:w-[240px] border-brutal-3 bg-background shadow-brutal-sm font-bold text-lg h-12">
          <SelectValue placeholder="Select metal" />
        </SelectTrigger>
        <SelectContent className="border-brutal-3">
          {metals.map((metal) => (
            <SelectItem key={metal.id} value={metal.id} className="font-medium">
              {metal.symbol} — {metal.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedMetal && riskLevel && riskScore !== undefined && (
        <div className="flex items-center gap-3">
          <RiskBadge level={riskLevel} score={riskScore} />
          <span className="text-sm text-muted-foreground">
            {selectedMetal.description}
          </span>
        </div>
      )}
    </div>
  );
}
