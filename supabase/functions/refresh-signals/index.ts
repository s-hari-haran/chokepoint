import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const METAL_SEARCH_TERMS: Record<string, string[]> = {
  'Gallium': ['gallium export', 'gallium supply', 'gallium China'],
  'Neodymium': ['neodymium rare earth', 'rare earth export', 'NdFeB magnet supply'],
  'Cobalt': ['cobalt DRC', 'cobalt supply chain', 'cobalt battery'],
  'Lithium': ['lithium supply', 'lithium export', 'lithium mining'],
  'Tungsten': ['tungsten export', 'tungsten supply', 'APT tungsten'],
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!firecrawlKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase credentials not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Database not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all metals
    const { data: metals, error: metalsError } = await supabase
      .from('metals')
      .select('id, name');

    if (metalsError) {
      console.error('Failed to fetch metals:', metalsError);
      throw metalsError;
    }

    console.log('Processing', metals.length, 'metals');

    const allResults: Array<{
      metal_id: string;
      headline: string;
      summary: string | null;
      source_name: string;
      source_url: string;
      published_date: string | null;
    }> = [];

    // Search for each metal
    for (const metal of metals) {
      const searchTerms = METAL_SEARCH_TERMS[metal.name] || [`${metal.name} supply chain`];
      
      for (const term of searchTerms) {
        const searchQuery = `${term} export control policy 2024 2025`;
        
        console.log(`Searching for: ${searchQuery}`);

        try {
          const response = await fetch('https://api.firecrawl.dev/v1/search', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${firecrawlKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: searchQuery,
              limit: 5,
              tbs: 'qdr:m', // Last month
            }),
          });

          if (!response.ok) {
            console.error(`Search failed for ${term}:`, response.status);
            continue;
          }

          const data = await response.json();
          const results = data.data || [];

          for (const result of results) {
            // Avoid duplicates by URL
            if (allResults.some(r => r.source_url === result.url)) {
              continue;
            }

            allResults.push({
              metal_id: metal.id,
              headline: result.title?.slice(0, 500) || 'No title',
              summary: result.description?.slice(0, 1000) || null,
              source_name: new URL(result.url).hostname.replace('www.', ''),
              source_url: result.url,
              published_date: null, // Firecrawl doesn't always provide dates
            });
          }

          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (searchError) {
          console.error(`Error searching ${term}:`, searchError);
        }
      }
    }

    console.log('Found', allResults.length, 'unique results');

    // Insert new results
    if (allResults.length > 0) {
      const { error: insertError } = await supabase
        .from('news_updates')
        .insert(allResults);

      if (insertError) {
        console.error('Failed to insert news:', insertError);
        throw insertError;
      }
    }

    console.log('Signal refresh complete');

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { 
          inserted: allResults.length,
          metals_processed: metals.length,
        } 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error refreshing signals:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to refresh signals';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
