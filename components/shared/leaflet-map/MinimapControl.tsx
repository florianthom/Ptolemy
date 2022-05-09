import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = { position: number[]; zoom: number };

export default function LeafletMap({ position, zoom }: Props) {
  useEffect(() => {}, []);

  const parentMap = useMap();
  const mapZoom = zoom || 0;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    []
  );

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}
