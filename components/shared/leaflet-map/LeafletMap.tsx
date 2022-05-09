import { useEffect } from "react";
import {
  CircleMarker,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon, PointExpression } from "leaflet";
import MinimapControl from "./MinimapControl";

type Props = {};

export default function LeafletMap({}: Props) {
  useEffect(() => {}, []);

  const initialCenter: LatLngExpression = [52.6310925, 13.49566709];
  const zoom = 17.5;
  const markerIcon = new Icon({
    iconUrl: markerIconPng.src,
    iconSize: [markerIconPng.width, markerIconPng.height] as PointExpression,
    iconAnchor: [markerIconPng.width / 2, markerIconPng.height / 2],
  });
  const markerPosition: LatLngExpression = [52.6310925, 13.49566709];

  const rectangle: LatLngBoundsExpression = [
    [52.631, 13.4956],
    [52.6314, 13.496],
  ];

  return (
    <MapContainer
      center={initialCenter}
      zoom={zoom}
      scrollWheelZoom={true}
      className="h-96 w-full"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayersControl position="topright">
        <LayersControl.Overlay name="Marker with popup">
          <CircleMarker
            center={initialCenter}
            pathOptions={{ color: "black" }}
            radius={20}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Rectangle">
          <Rectangle bounds={rectangle} pathOptions={{ color: "black" }}>
            <Tooltip sticky>sticky Tooltip for Polygon</Tooltip>
          </Rectangle>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Marker with popup">
          <Marker position={markerPosition} icon={markerIcon}>
            <Popup>
              A pretty CSS3 popup.
              <br />
              Easily customizable.
            </Popup>
          </Marker>
        </LayersControl.Overlay>
      </LayersControl>
      {/* <MinimapControl position="topright" zoom={zoom} /> */}
    </MapContainer>
  );
}
