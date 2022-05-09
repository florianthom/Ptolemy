import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon, PointExpression } from "leaflet";

type Props = {};

export default function LeafletMap({}: Props) {
  useEffect(() => {}, []);

  const initialCenter: LatLngExpression = [
    52.63109251312334, 13.495667095941126,
  ];
  const markerPosition: LatLngExpression = [
    52.63109251312334, 13.495667095941126,
  ];
  console.log(markerIconPng);

  return (
    <MapContainer
      center={initialCenter}
      zoom={17.5}
      scrollWheelZoom={true}
      className="h-96 w-full"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={markerPosition}
        icon={
          new Icon({
            iconUrl: markerIconPng.src,
            iconSize: [
              markerIconPng.width,
              markerIconPng.height,
            ] as PointExpression,
            iconAnchor: [markerIconPng.width / 2, markerIconPng.height / 2],
          })
        }
      >
        <Popup>
          A pretty CSS3 popup.
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
