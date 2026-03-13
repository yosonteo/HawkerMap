interface RegionFilterProps {
  regions: string[];
  selected: string;
  onSelect: (region: string) => void;
}

/**
 * Horizontal row of clickable region chips.
 * Clicking the active chip deselects it (shows all).
 */
export default function RegionFilter({
  regions,
  selected,
  onSelect,
}: RegionFilterProps) {
  return (
    <div className="region-filter" role="group" aria-label="Filter by region">
      <button
        className={`region-chip ${selected === "" ? "active" : ""}`}
        onClick={() => onSelect("")}
      >
        All
      </button>
      {regions.map((r) => (
        <button
          key={r}
          className={`region-chip ${selected === r ? "active" : ""}`}
          onClick={() => onSelect(selected === r ? "" : r)}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
