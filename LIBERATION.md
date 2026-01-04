# Liberation Guide: Self-Hosting Chokepoint Dashboard

This guide walks you through migrating from Lovable to your own infrastructure.

---

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Firecrawl API key (get one at https://firecrawl.dev)
- Git installed
- A hosting provider (Vercel, Netlify, or similar)

---

## Step 1: Download & Extract

1. Download the project ZIP from Lovable
2. Extract to a local folder
3. Open terminal in that folder
4. Run: `npm install`

---

## Step 2: Create Your Own Supabase Project

1. Go to https://supabase.com and create a new project
2. Note your:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon Key**: Found in Settings → API → `anon` `public`
   - **Service Role Key**: Found in Settings → API → `service_role` (keep secret!)

---

## Step 3: Set Up Database Schema

In your Supabase dashboard, go to **SQL Editor** and run:

```sql
-- Create metals table
CREATE TABLE public.metals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create country_supply table
CREATE TABLE public.country_supply (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metal_id UUID REFERENCES public.metals(id) ON DELETE CASCADE,
  country_name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  percent_control NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create industry_dependency table
CREATE TABLE public.industry_dependency (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metal_id UUID REFERENCES public.metals(id) ON DELETE CASCADE,
  industry TEXT NOT NULL CHECK (industry IN ('Semiconductors', 'Electric Vehicles', 'Aerospace', 'Renewable Energy', 'Defense', 'Medical Devices', 'Telecommunications', 'Battery Technology')),
  dependency_score INTEGER NOT NULL CHECK (dependency_score >= 1 AND dependency_score <= 5),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create choke_points table
CREATE TABLE public.choke_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metal_id UUID REFERENCES public.metals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('export_restriction', 'production_halt', 'logistics_disruption', 'policy_change')),
  severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 5),
  is_active BOOLEAN DEFAULT true,
  source_url TEXT,
  detected_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create news_updates table
CREATE TABLE public.news_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metal_id UUID REFERENCES public.metals(id) ON DELETE CASCADE,
  headline TEXT NOT NULL,
  summary TEXT,
  source TEXT,
  url TEXT,
  scraped_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS (optional but recommended)
ALTER TABLE public.metals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.country_supply ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_dependency ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.choke_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_updates ENABLE ROW LEVEL SECURITY;

-- Allow public read access (adjust as needed)
CREATE POLICY "Public read access" ON public.metals FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.country_supply FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.industry_dependency FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.choke_points FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.news_updates FOR SELECT USING (true);
```

---

## Step 4: Seed Your Data

Run INSERT statements for your metals data (copy from Lovable's database or create your own).

---

## Step 5: Update Environment Variables

Create/update `.env` file in project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
VITE_SUPABASE_PROJECT_ID=YOUR_PROJECT_ID
```

---

## Step 6: Deploy Edge Functions

### Install Supabase CLI

```bash
npm install -g supabase
```

### Login & Link

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_ID
```

### Set Secrets

```bash
supabase secrets set FIRECRAWL_API_KEY=your_firecrawl_api_key
```

### Deploy Functions

```bash
supabase functions deploy firecrawl-search
supabase functions deploy refresh-signals
```

---

## Step 7: Update Client Configuration

Edit `src/integrations/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
```

---

## Step 8: Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## Step 9: Deploy to Production

### Option A: Vercel

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Option B: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

Add environment variables in Netlify dashboard.

### Option C: Self-hosted

```bash
npm run build
# Serve the `dist` folder with any static file server
```

---

## File Structure Reference

```
├── .env                          # Your environment variables
├── src/
│   ├── integrations/supabase/
│   │   ├── client.ts             # Supabase client (update this)
│   │   └── types.ts              # Auto-generated types
│   └── lib/api/
│       └── firecrawl.ts          # Firecrawl API wrapper
├── supabase/
│   ├── config.toml               # Supabase config (update project_id)
│   └── functions/
│       ├── firecrawl-search/     # Search edge function
│       └── refresh-signals/      # Signal refresh edge function
```

---

## Regenerating Types (Optional)

After schema changes:

```bash
supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "FIRECRAWL_API_KEY not configured" | Run `supabase secrets set FIRECRAWL_API_KEY=xxx` |
| CORS errors | Check edge function CORS headers |
| Empty dashboard | Verify database has seed data |
| Auth errors | Check anon key matches your project |

---

## Summary

1. Download ZIP
2. Create Supabase project
3. Run SQL schema
4. Update `.env` with your credentials
5. Deploy edge functions with Supabase CLI
6. Run locally or deploy to hosting provider

**You're now fully liberated.** 🚀
