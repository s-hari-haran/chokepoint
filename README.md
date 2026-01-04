# Chokepoint

**Critical Materials Risk Dashboard**

A real-time dashboard for monitoring supply chain risks in critical materials — rare earths, battery metals, and semiconductors.

🔗 **Live Demo**: [realhariharan.live/projects/chokepoint](https://realhariharan.live/projects/chokepoint)

---

## Features

- **8 Critical Materials** — Gallium, Neodymium, Cobalt, Lithium, Tungsten, Silicon, Copper, Iron
- **Supply Concentration** — Visualize which countries control each material
- **Industry Impact** — See dependency scores across Semiconductors, EVs, Defense, Renewables
- **Choke Point Alerts** — Active risk factors like export controls, refining bottlenecks
- **Risk Scoring** — Calculated exposure rankings across all materials
- **Signal Timeline** — Latest news scraped via Firecrawl API

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (PostgreSQL) |
| Edge Functions | Deno (Supabase Functions) |
| Data Scraping | Firecrawl API |
| Hosting | Vercel |

---

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── dashboard/       # Dashboard components
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/               # React Query hooks
│   ├── integrations/        # Supabase client
│   ├── lib/                 # Utilities & API
│   ├── pages/               # Route pages
│   └── types/               # TypeScript types
├── supabase/
│   ├── functions/           # Edge functions
│   └── migrations/          # Database schema
└── public/                  # Static assets
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Firecrawl API key (optional, for news scraping)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/chokepoint.git
cd chokepoint

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
npm run dev
```

### Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

---

## Database Setup

Run the migration SQL in your Supabase SQL Editor (found in `supabase/migrations/`).

---

## Deployment

### Vercel

```bash
npm run build
vercel --prod
```

### Edge Functions

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_ID
supabase secrets set FIRECRAWL_API_KEY=your_key
supabase functions deploy firecrawl-search
supabase functions deploy refresh-signals
```

---

## Data Sources

- USGS Mineral Commodity Summaries
- Reuters, Mining.com
- MOFCOM (China Ministry of Commerce)

---

## License

MIT

---

Built by [Hari Haran](https://realhariharan.live)
