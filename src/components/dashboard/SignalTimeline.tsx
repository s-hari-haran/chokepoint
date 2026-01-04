import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  headline: string;
  summary: string | null;
  source_name: string;
  source_url: string;
  published_date: string | null;
  scraped_at: string;
  metals: { name: string } | null;
}

interface SignalTimelineProps {
  news: NewsItem[];
}

export function SignalTimeline({ news }: SignalTimelineProps) {
  return (
    <div className="border-brutal-3 bg-background p-4 shadow-brutal">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-2 border-b-2 border-foreground pb-2">
        Signal Timeline
      </h3>
      <p className="text-xs text-muted-foreground mb-4">Last 60 days • Max 15 events</p>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {news.map((item) => (
          <article key={item.id} className="border-l-4 border-foreground pl-3 py-1">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium text-sm leading-tight">{item.headline}</h4>
              <a
                href={item.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 p-1 hover:bg-secondary"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {item.summary && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {item.summary}
              </p>
            )}

            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              {item.metals?.name && (
                <span className="bg-secondary px-1.5 py-0.5 font-mono uppercase">
                  {item.metals.name}
                </span>
              )}
              <span>{item.source_name}</span>
              <span className="font-mono">
                {format(new Date(item.scraped_at), 'MMM d, yyyy')}
              </span>
            </div>
          </article>
        ))}

        {news.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No recent signals</p>
        )}
      </div>
    </div>
  );
}
