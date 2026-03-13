# SG Hawker Map

An interactive geospatial visualization of Singapore's hawker centres with search, region filtering, and marker clustering.

---

## Overview

### Approach & Architecture

The app follows a full-stack architecture with three layers:

- **Frontend** — React 18 + Vite + TypeScript. Uses `react-leaflet` for the interactive map and `react-leaflet-cluster` for marker clustering. Sidebar has search, region filter chips, stats, and a scrollable hawker list.
- **Backend** — FastAPI (Python) REST API with endpoints for listing hawkers (search/filter), regions, and stats. Queries Supabase via the official Python SDK.
- **Database** — Supabase (PostgreSQL) stores hawker centre records with coordinates, region, and stall count. Row Level Security is enabled with a public read policy.

---

## Setup Instructions

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10
- A free [Supabase](https://supabase.com) account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/sg-hawker-map.git
cd sg-hawker-map
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Open the **SQL Editor** and run the contents of `database/seed.sql`
3. Go to **Settings → API** and copy your **Project URL** and **anon key**

### 3. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env           # paste your Supabase URL + key into .env
uvicorn main:app --reload --port 8000
```

API available at `http://localhost:8000` — Swagger UI at `http://localhost:8000/docs`.

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The Vite dev server proxies `/api/*` to the backend on port 8000.

---

## Testing Instructions

### Frontend (Vitest)

```bash
cd frontend
npm test
```

### Backend (Pytest)

```bash
cd backend
source .venv/bin/activate
pip install pytest httpx
pytest test_main.py -v
```

---

## Assumptions / Challenges

### Assumptions

- Hawker data was compiled from data.gov.sg. Coordinates and stall counts are approximate.
- Regions map to Singapore's 5 planning areas: Central, East, West, North, North-East.
- The dataset is small enough (~80 records) that fetching everything in one call is acceptable — pagination is out of scope.
- Routing through a Python backend is preferred over direct Supabase client queries, to keep API keys off the frontend.

### Challenges

- **CORS** — The Vite dev proxy handles CORS locally. A production deployment would need both services behind the same domain or an explicit CORS policy on the backend.
- **Leaflet CSS** — Leaflet's stylesheet must be loaded via CDN in `index.html`; bundling it normally breaks tile and marker rendering.
- **Testing map components** — Leaflet manipulates the DOM directly and doesn't work in jsdom (the default Vitest environment). Map components had to be mocked out in tests to avoid errors.
- **Map–sidebar sync** — Keeping the selected hawker in sync between the sidebar list and the map marker required careful state lifting; markers inside clusters are not directly accessible until the cluster is expanded.
- **Coordinate data quality** — Several hawker centres from the source dataset had missing or inaccurate coordinates that required manual correction before they could be plotted correctly.
