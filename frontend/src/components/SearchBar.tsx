interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Search input with a magnifying glass icon.
 */
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-box">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="Search hawker centres…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search hawker centres by name"
      />
    </div>
  );
}
