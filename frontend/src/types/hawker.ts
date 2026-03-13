/** Shape of a hawker centre record returned by the API. */
export interface HawkerCentre {
  id: number;
  name: string;
  address: string | null;
  postal_code: string | null;
  latitude: number;
  longitude: number;
  region: string | null;
  num_stalls: number | null;
  created_at: string;
}

/** API response wrapper. */
export interface HawkerResponse {
  data: HawkerCentre[];
  count: number;
}

/** Region stats from /api/stats. */
export interface StatsResponse {
  total_centres: number;
  total_stalls: number;
  by_region: Record<string, number>;
}
