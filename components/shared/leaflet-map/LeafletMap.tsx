import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, LatLngExpression } from "leaflet";

type Props = {};

export default function LeafletMap({}: Props) {
  useEffect(() => {}, []);

  const initialCenter: LatLngExpression = [51.505, -0.09];
  const markerPosition: LatLngExpression = [51.505, -0.09];

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      scrollWheelZoom={true}
      className="h-96 w-full"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={markerPosition}>
        <Popup>
          A pretty CSS3 popup.
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
