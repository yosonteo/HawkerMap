import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchHawkers, fetchRegions, fetchStats } from "../utils/api";

// Mock global fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("fetchHawkers", () => {
  it("calls /api/hawkers with no params when no filters", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [], count: 0 }),
    });

    await fetchHawkers();
    expect(mockFetch).toHaveBeenCalledWith("/api/hawkers");
  });

  it("includes search param when provided", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [], count: 0 }),
    });

    await fetchHawkers("maxwell");
    expect(mockFetch).toHaveBeenCalledWith("/api/hawkers?search=maxwell");
  });

  it("includes both search and region params", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [], count: 0 }),
    });

    await fetchHawkers("food", "Central");
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/hawkers?search=food&region=Central"
    );
  });

  it("throws on non-OK response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
    });

    await expect(fetchHawkers()).rejects.toThrow("Failed to fetch hawkers");
  });
});

describe("fetchRegions", () => {
  it("returns array of region strings", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: ["Central", "East", "West"] }),
    });

    const regions = await fetchRegions();
    expect(regions).toEqual(["Central", "East", "West"]);
  });
});

describe("fetchStats", () => {
  it("returns stats object", async () => {
    const mockStats = {
      total_centres: 80,
      total_stalls: 3500,
      by_region: { Central: 30, East: 20 },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    const stats = await fetchStats();
    expect(stats.total_centres).toBe(80);
    expect(stats.by_region.Central).toBe(30);
  });
});
