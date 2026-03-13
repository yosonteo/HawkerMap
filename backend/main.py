# ============================================================
# Singapore Hawker Centre Map - Backend API
# FastAPI server that serves hawker centre data from Supabase
# ============================================================

import os
from typing import Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# --------------- Supabase Client ---------------
SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError(
        "Missing SUPABASE_URL or SUPABASE_KEY. "
        "Copy .env.example → .env and fill in your credentials."
    )

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# --------------- FastAPI App ---------------
app = FastAPI(
    title="SG Hawker Centre API",
    description="REST API for Singapore hawker centre data",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------- Routes ---------------
@app.get("/")
def root():
    """Health-check endpoint."""
    return {"status": "ok", "message": "SG Hawker Centre API"}


@app.get("/api/hawkers")
def get_hawkers(
    search: Optional[str] = Query(None, description="Search by name (case-insensitive)"),
    region: Optional[str] = Query(None, description="Filter by region"),
):
    """
    Fetch hawker centres with optional search and region filters.

    Query params:
        search  – partial name match (case-insensitive)
        region  – exact region match (Central, East, West, North, North-East)
    """
    try:
        query = supabase.table("hawker_centres").select("*")

        if search:
            query = query.ilike("name", f"%{search}%")

        if region:
            query = query.eq("region", region)

        query = query.order("name")
        response = query.execute()

        return {"data": response.data, "count": len(response.data)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/hawkers/{hawker_id}")
def get_hawker_by_id(hawker_id: int):
    """Fetch a single hawker centre by ID."""
    try:
        response = (
            supabase.table("hawker_centres")
            .select("*")
            .eq("id", hawker_id)
            .single()
            .execute()
        )
        return {"data": response.data}

    except Exception as e:
        raise HTTPException(status_code=404, detail="Hawker centre not found")


@app.get("/api/regions")
def get_regions():
    """Fetch distinct regions for the filter dropdown."""
    try:
        response = supabase.table("hawker_centres").select("region").execute()
        regions = sorted(set(row["region"] for row in response.data if row["region"]))
        return {"data": regions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/stats")
def get_stats():
    """Aggregate stats about hawker centres for the dashboard."""
    try:
        response = supabase.table("hawker_centres").select("*").execute()
        data = response.data

        total = len(data)

        # Count per region
        region_counts: dict[str, int] = {}
        for row in data:
            r = row.get("region", "Unknown")
            region_counts[r] = region_counts.get(r, 0) + 1

        # Total stalls
        total_stalls = sum(row.get("num_stalls", 0) for row in data)

        return {
            "total_centres": total,
            "total_stalls": total_stalls,
            "by_region": region_counts,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
