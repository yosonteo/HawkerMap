import type { HawkerResponse, StatsResponse } from "../types/hawker";

const BASE_URL = "/api";

/**
 * Fetch hawker centres with optional search & region filter.
 */
export async function fetchHawkers(
  search?: string,
  region?: string
): Promise<HawkerResponse> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (region) params.set("region", region);

  const url = `${BASE_URL}/hawkers${params.toString() ? `?${params}` : ""}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch hawkers: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch available regions for the filter dropdown.
 */
export async function fetchRegions(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/regions`);

  if (!res.ok) {
    throw new Error(`Failed to fetch regions: ${res.statusText}`);
  }

  const json = await res.json();
  return json.data;
}

/**
 * Fetch aggregate stats.
 */
export async function fetchStats(): Promise<StatsResponse> {
  const res = await fetch(`${BASE_URL}/stats`);

  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.statusText}`);
  }

  return res.json();
}
