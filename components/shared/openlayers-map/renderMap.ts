import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { RefObject } from "react";
import "ol/ol.css";
import { fromLonLat, Projection } from "ol/proj";
import Interaction, { InteractionOptions } from "ol/interaction/Interaction";
import { defaults } from "ol/interaction";
import Draw from "ol/interaction/Draw";

export function renderMap(mapRef: RefObject<HTMLDivElement>): Map {
  const initialMap = new Map({
    target: mapRef.current || undefined,
    interactions: defaults({ mouseWheelZoom: false }),
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([13.49566709, 52.6310925]),
      zoom: 8.5,
    }),
  });
  return initialMap;
}
