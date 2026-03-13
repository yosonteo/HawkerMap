import type { StatsResponse } from "../types/hawker";

interface StatsStripProps {
  stats: StatsResponse | null;
  filteredCount: number;
}

/**
 * Small stat cards displayed below the filters.
 */
export default function StatsStrip({ stats, filteredCount }: StatsStripProps) {
  return (
    <div className="stats-strip">
      <div className="stat-card">
        <div className="stat-value">{filteredCount}</div>
        <div className="stat-label">Showing</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats?.total_centres ?? "—"}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">
          {stats ? stats.total_stalls.toLocaleString() : "—"}
        </div>
        <div className="stat-label">Stalls</div>
      </div>
    </div>
  );
}
