-- Create metals table (static reference)
CREATE TABLE public.metals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  symbol TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create country_supply table (curated baseline data)
CREATE TABLE public.country_supply (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metal_id UUID NOT NULL REFERENCES public.metals(id) ON DELETE CASCADE,
  country_code TEXT NOT NULL,
  country_name TEXT NOT NULL,
  percent_control DECIMAL(5,2) NOT NULL CHECK (percent_control >= 0 AND percent_control <= 100),
  year INTEGER NOT NULL DEFAULT 2024,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create industry_dependency table (curated baseline data)
CREATE TABLE public.industry_dependency (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metal_id UUID NOT NULL REFERENCES public.metals(id) ON DELETE CASCADE,
  industry TEXT NOT NULL CHECK (industry IN ('semiconductors', 'evs', 'defense', 'renewables')),
  dependency_score INTEGER NOT NULL CHECK (dependency_score >= 1 AND dependency_score <= 5),
  rationale TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(metal_id, industry)
);

-- Create choke_points table (structured risk factors)
CREATE TABLE public.choke_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metal_id UUID NOT NULL REFERENCES public.metals(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('export_control', 'refining', 'logistics')),
  country_code TEXT NOT NULL,
  severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 5),
  active BOOLEAN NOT NULL DEFAULT true,
  description TEXT NOT NULL,
  source_url TEXT,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create news_updates table (Firecrawl signals only)
CREATE TABLE public.news_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metal_id UUID REFERENCES public.metals(id) ON DELETE SET NULL,
  headline TEXT NOT NULL,
  summary TEXT,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  published_date DATE,
  scraped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public read, no write from client)
ALTER TABLE public.metals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.country_supply ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_dependency ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.choke_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_updates ENABLE ROW LEVEL SECURITY;

-- Public read policies (analyst dashboard is public)
CREATE POLICY "Allow public read on metals" ON public.metals FOR SELECT USING (true);
CREATE POLICY "Allow public read on country_supply" ON public.country_supply FOR SELECT USING (true);
CREATE POLICY "Allow public read on industry_dependency" ON public.industry_dependency FOR SELECT USING (true);
CREATE POLICY "Allow public read on choke_points" ON public.choke_points FOR SELECT USING (true);
CREATE POLICY "Allow public read on news_updates" ON public.news_updates FOR SELECT USING (true);

-- Create indexes for common queries
CREATE INDEX idx_country_supply_metal ON public.country_supply(metal_id);
CREATE INDEX idx_industry_dependency_metal ON public.industry_dependency(metal_id);
CREATE INDEX idx_choke_points_metal ON public.choke_points(metal_id);
CREATE INDEX idx_choke_points_active ON public.choke_points(active) WHERE active = true;
CREATE INDEX idx_news_updates_scraped ON public.news_updates(scraped_at DESC);
CREATE INDEX idx_news_updates_metal ON public.news_updates(metal_id);