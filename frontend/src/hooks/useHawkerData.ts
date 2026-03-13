import { useState, useEffect, useCallback } from "react";
import type { HawkerCentre, StatsResponse } from "../types/hawker";
import { fetchHawkers, fetchRegions, fetchStats } from "../utils/api";

/**
 * Central hook that manages hawker data, filters, and loading state.
 */
export function useHawkerData() {
  const [hawkers, setHawkers] = useState<HawkerCentre[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active filters
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  // Debounced search value
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch regions once on mount
  useEffect(() => {
    fetchRegions()
      .then(setRegions)
      .catch((e) => console.error("Failed to load regions:", e));
  }, []);

  // Fetch stats once on mount
  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((e) => console.error("Failed to load stats:", e));
  }, []);

  // Fetch hawkers when filters change
  const loadHawkers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchHawkers(
        debouncedSearch || undefined,
        region || undefined
      );
      setHawkers(res.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, region]);

  useEffect(() => {
    loadHawkers();
  }, [loadHawkers]);

  return {
    hawkers,
    regions,
    stats,
    loading,
    error,
    search,
    setSearch,
    region,
    setRegion,
    retry: loadHawkers,
  };
}
