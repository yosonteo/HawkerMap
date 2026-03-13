"""
Tests for the FastAPI backend.
Run with: pytest backend/test_main.py -v
"""

import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient


# --------------- Fixtures ---------------
@pytest.fixture
def mock_supabase():
    """Patch supabase client before importing the app."""
    with patch.dict("os.environ", {
        "SUPABASE_URL": "https://test.supabase.co",
        "SUPABASE_KEY": "test-key",
    }):
        with patch("backend.main.create_client") as mock_create:
            mock_client = MagicMock()
            mock_create.return_value = mock_client
            yield mock_client


@pytest.fixture
def client(mock_supabase):
    """Create a test client with mocked Supabase."""
    # Re-import to pick up mocked env vars
    import importlib
    import backend.main as main_module
    importlib.reload(main_module)

    return TestClient(main_module.app)


# --------------- Sample data ---------------
SAMPLE_HAWKERS = [
    {
        "id": 1,
        "name": "Maxwell Food Centre",
        "address": "1 Kadayanallur Street",
        "postal_code": "069184",
        "latitude": 1.2804,
        "longitude": 103.8448,
        "region": "Central",
        "num_stalls": 100,
        "created_at": "2024-01-01T00:00:00Z",
    },
    {
        "id": 2,
        "name": "Changi Village Hawker Centre",
        "address": "2 Changi Village Road",
        "postal_code": "500002",
        "latitude": 1.3891,
        "longitude": 103.9875,
        "region": "East",
        "num_stalls": 55,
        "created_at": "2024-01-01T00:00:00Z",
    },
]


# --------------- Tests ---------------
class TestHealthCheck:
    def test_root_returns_ok(self, client):
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"


class TestGetHawkers:
    def test_returns_hawker_list(self, client, mock_supabase):
        # Set up the mock chain
        mock_query = MagicMock()
        mock_supabase.table.return_value.select.return_value = mock_query
        mock_query.order.return_value.execute.return_value.data = SAMPLE_HAWKERS

        response = client.get("/api/hawkers")
        assert response.status_code == 200

        data = response.json()
        assert data["count"] == 2
        assert data["data"][0]["name"] == "Maxwell Food Centre"

    def test_search_filter(self, client, mock_supabase):
        mock_query = MagicMock()
        mock_supabase.table.return_value.select.return_value = mock_query
        mock_query.ilike.return_value = mock_query
        mock_query.order.return_value.execute.return_value.data = [SAMPLE_HAWKERS[0]]

        response = client.get("/api/hawkers?search=maxwell")
        assert response.status_code == 200
        assert response.json()["count"] == 1

    def test_region_filter(self, client, mock_supabase):
        mock_query = MagicMock()
        mock_supabase.table.return_value.select.return_value = mock_query
        mock_query.eq.return_value = mock_query
        mock_query.order.return_value.execute.return_value.data = [SAMPLE_HAWKERS[1]]

        response = client.get("/api/hawkers?region=East")
        assert response.status_code == 200
        assert response.json()["data"][0]["region"] == "East"


class TestGetRegions:
    def test_returns_distinct_regions(self, client, mock_supabase):
        mock_supabase.table.return_value.select.return_value.execute.return_value.data = [
            {"region": "Central"},
            {"region": "East"},
            {"region": "Central"},
            {"region": "West"},
        ]

        response = client.get("/api/regions")
        assert response.status_code == 200

        regions = response.json()["data"]
        assert len(regions) == 3
        assert "Central" in regions
        assert regions == sorted(regions)  # alphabetical


class TestGetStats:
    def test_returns_aggregate_stats(self, client, mock_supabase):
        mock_supabase.table.return_value.select.return_value.execute.return_value.data = SAMPLE_HAWKERS

        response = client.get("/api/stats")
        assert response.status_code == 200

        stats = response.json()
        assert stats["total_centres"] == 2
        assert stats["total_stalls"] == 155
        assert stats["by_region"]["Central"] == 1
        assert stats["by_region"]["East"] == 1
