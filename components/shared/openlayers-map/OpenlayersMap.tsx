import { RefObject, useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import React from "react";

type Props = {};

function renderMap(mapRef: RefObject<HTMLDivElement>) {}

export default function OpenlayersMap({}: Props) {
  const [map, setMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current || undefined,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
    setMap(true);
  }, [mapRef]);

  if (!map) {
    return;
  }

  return (
    <>
      <React.StrictMode>
        <div id="map" ref={mapRef} className="h-96 w-full"></div>
      </React.StrictMode>
    </>
  );
}
