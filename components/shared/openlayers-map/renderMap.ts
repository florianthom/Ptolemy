import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { RefObject } from "react";
import "ol/ol.css";

export function renderMap(mapRef: RefObject<HTMLDivElement>): Map {
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
  return initialMap;
}
