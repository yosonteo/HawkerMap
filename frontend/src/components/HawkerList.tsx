import type { HawkerCentre } from "../types/hawker";

interface HawkerListProps {
  hawkers: HawkerCentre[];
  selectedId: number | null;
  onSelect: (hawker: HawkerCentre) => void;
}

/** Colour map for region icons. */
const REGION_COLORS: Record<string, string> = {
  Central: "#d4552a",
  East: "#2a8c6a",
  West: "#c49a2b",
  North: "#4a72b8",
  "North-East": "#8b5bb5",
};

/** Emoji per region for the icon square. */
const REGION_EMOJI: Record<string, string> = {
  Central: "🏙️",
  East: "🌊",
  West: "🌳",
  North: "🏗️",
  "North-East": "🌿",
};

/**
 * Scrollable list of hawker centres in the sidebar.
 */
export default function HawkerList({
  hawkers,
  selectedId,
  onSelect,
}: HawkerListProps) {
  if (hawkers.length === 0) {
    return (
      <div className="empty-state">
        <span>🍜</span>
        No hawker centres found.
        <br />
        Try adjusting your search or filter.
      </div>
    );
  }

  return (
    <div className="hawker-list">
      {hawkers.map((h) => {
        const regionColor = REGION_COLORS[h.region ?? ""] ?? "#999";

        return (
          <div
            key={h.id}
            className={`hawker-item ${selectedId === h.id ? "selected" : ""}`}
            onClick={() => onSelect(h)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(h);
            }}
          >
            <div
              className="hawker-item-icon"
              style={{ background: regionColor + "18", color: regionColor }}
            >
              {REGION_EMOJI[h.region ?? ""] ?? "📍"}
            </div>

            <div className="hawker-item-info">
              <div className="hawker-item-name">{h.name}</div>
              <div className="hawker-item-address">
                {h.address ?? "Address not available"}
              </div>
              <div className="hawker-item-meta">
                {h.region && (
                  <span className="hawker-item-badge badge-region">
                    {h.region}
                  </span>
                )}
                {h.num_stalls && (
                  <span className="hawker-item-badge badge-stalls">
                    {h.num_stalls} stalls
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
