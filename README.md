# Chokepoint — Critical Materials Risk Dashboard

A real-time dashboard for monitoring supply chain risks in critical materials (rare earths, battery metals, semiconductors).

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Data**: Firecrawl API for news scraping

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your Project URL and Anon Key from Settings → API

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

### 4. Set Up Database

Run the SQL from `LIBERATION.md` (Step 3) in your Supabase SQL Editor, then seed with `SEED.md`.

### 5. Deploy Edge Functions

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_ID
supabase secrets set FIRECRAWL_API_KEY=your_firecrawl_key
supabase functions deploy firecrawl-search
supabase functions deploy refresh-signals
```

### 6. Run Locally

```bash
npm run dev
```

Visit http://localhost:8080

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Self-Hosted
```bash
npm run build
# Serve the dist folder with any static server
```

## Documentation

- [LIBERATION.md](LIBERATION.md) — Full self-hosting guide
- [SEED.md](SEED.md) — Database seed data

## Data Sources

- USGS Mineral Commodity Summaries
- Reuters, Mining.com
- MOFCOM (China Ministry of Commerce)
