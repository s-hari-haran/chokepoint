import { useState } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { firecrawlApi } from '@/lib/api/firecrawl';

interface DashboardHeaderProps {
  lastRefresh: Date | null;
}

export function DashboardHeader({ lastRefresh }: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const result = await firecrawlApi.refreshSignals();
      
      if (result.success) {
        const inserted = (result.data as { inserted?: number })?.inserted ?? 0;
        toast({
          title: 'Signals refreshed',
          description: `Found ${inserted} new updates`,
        });
        queryClient.invalidateQueries({ queryKey: ['news_updates'] });
      } else {
        toast({
          title: 'Refresh failed',
          description: result.error || 'Could not refresh signals',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Refresh failed',
        description: 'Network error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <header className="border-brutal-4 border-b-4 bg-background p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-8 w-8" strokeWidth={2.5} />
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">Chokepoint</h1>
            <p className="text-sm text-muted-foreground font-mono">
              Critical Materials Risk Dashboard
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {lastRefresh && (
            <span className="text-xs font-mono text-muted-foreground">
              Last refresh: {lastRefresh.toLocaleDateString()} {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-brutal-3 shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      </div>
    </header>
  );
}
