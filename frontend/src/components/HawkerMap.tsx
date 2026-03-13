import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import type { HawkerCentre } from "../types/hawker";

// --------------- Custom marker icon ---------------
const REGION_COLORS: Record<string, string> = {
  Central: "#d4552a",
  East: "#2a8c6a",
  West: "#c49a2b",
  North: "#4a72b8",
  "North-East": "#8b5bb5",
};

function createIcon(region: string | null): L.DivIcon {
  const color = REGION_COLORS[region ?? ""] ?? "#999";
  return L.divIcon({
    className: "custom-marker",
    html: `
      <svg width="28" height="36" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z"
              fill="${color}" opacity="0.9"/>
        <circle cx="14" cy="13" r="5" fill="white" opacity="0.9"/>
      </svg>
    `,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -34],
  });
}

// --------------- Fly-to helper ---------------
function FlyToSelected({ selected }: { selected: HawkerCentre | null }) {
  const map = useMap();

  useEffect(() => {
    if (selected) {
      map.flyTo([selected.latitude, selected.longitude], 16, {
        duration: 0.8,
      });
    }
  }, [selected, map]);

  return null;
}

// --------------- Main map component ---------------
interface HawkerMapProps {
  hawkers: HawkerCentre[];
  selected: HawkerCentre | null;
  onSelect: (hawker: HawkerCentre) => void;
}

/** Singapore centre coordinates. */
const SG_CENTER: [number, number] = [1.3521, 103.8198];
const SG_ZOOM = 12;

export default function HawkerMap({
  hawkers,
  selected,
  onSelect,
}: HawkerMapProps) {
  const markerRefs = useRef<Record<number, L.Marker>>({}); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Open popup for selected marker
  useEffect(() => {
    if (selected && markerRefs.current[selected.id]) {
      markerRefs.current[selected.id].openPopup();
    }
  }, [selected]);

  return (
    <MapContainer
      center={SG_CENTER}
      zoom={SG_ZOOM}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToSelected selected={selected} />

      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={50}
        spiderfyOnMaxZoom
        showCoverageOnHover={false}
      >
        {hawkers.map((h) => (
          <Marker
            key={h.id}
            position={[h.latitude, h.longitude]}
            icon={createIcon(h.region)}
            ref={(ref) => {
              if (ref) markerRefs.current[h.id] = ref;
            }}
            eventHandlers={{
              click: () => onSelect(h),
            }}
          >
            <Popup>
              <div className="popup-content">
                <h3>{h.name}</h3>
                <p>{h.address ?? "—"}</p>
                {h.postal_code && (
                  <p>
                    Singapore {h.postal_code}
                  </p>
                )}
                <div className="popup-badges">
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
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
