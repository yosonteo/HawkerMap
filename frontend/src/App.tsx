import { useState } from "react";
import { useHawkerData } from "./hooks/useHawkerData";
import SearchBar from "./components/SearchBar";
import RegionFilter from "./components/RegionFilter";
import StatsStrip from "./components/StatsStrip";
import HawkerList from "./components/HawkerList";
import HawkerMap from "./components/HawkerMap";
import type { HawkerCentre } from "./types/hawker";
import "./styles/global.css";

export default function App() {
  const {
    hawkers,
    regions,
    stats,
    loading,
    error,
    search,
    setSearch,
    region,
    setRegion,
    retry,
  } = useHawkerData();

  const [selected, setSelected] = useState<HawkerCentre | null>(null);

  const handleSelect = (hawker: HawkerCentre) => {
    setSelected((prev) => (prev?.id === hawker.id ? null : hawker));
  };

  return (
    <div className="app-layout">
      {/* ---- Sidebar ---- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>🍜 SG Hawker Map</h1>
          <p>Explore Singapore's hawker centres</p>
        </div>

        <div className="filters">
          <SearchBar value={search} onChange={setSearch} />
          <RegionFilter
            regions={regions}
            selected={region}
            onSelect={setRegion}
          />
        </div>

        <StatsStrip stats={stats} filteredCount={hawkers.length} />

        {error && (
          <div className="error-banner">
            <strong>Error:</strong> {error}
            <br />
            <button onClick={retry}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="loading-overlay">
            <div className="spinner" />
            <span>Loading hawker centres…</span>
          </div>
        ) : (
          <HawkerList
            hawkers={hawkers}
            selectedId={selected?.id ?? null}
            onSelect={handleSelect}
          />
        )}
      </aside>

      {/* ---- Map ---- */}
      <main className="map-wrapper">
        <HawkerMap
          hawkers={hawkers}
          selected={selected}
          onSelect={handleSelect}
        />
      </main>
    </div>
  );
}
