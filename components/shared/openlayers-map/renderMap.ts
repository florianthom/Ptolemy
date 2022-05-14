import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { RefObject } from "react";
import "ol/ol.css";
import { fromLonLat, Projection } from "ol/proj";
import { defaults } from "ol/interaction";
import Draw from "ol/interaction/Draw";
import ZoomSlider from "ol/control/ZoomSlider";
import { get as getProjection } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import { rasterLayer } from "./layers/rasterLayer";

export function renderMap(mapRef: RefObject<HTMLDivElement>): Map {
  const initialMap = new Map({
    target: mapRef.current || undefined,
    interactions: defaults({ mouseWheelZoom: false }),
    controls: defaultControls().extend([new ZoomSlider()]),
    view: new View({
      center: fromLonLat([13.49566709, 52.6310925]),
      zoom: 8.5,
      extent: [-572513.341856, 5211017.966314, 916327.095083, 6636950.728974],
    }),
    layers: [rasterLayer()],
  });
  return initialMap;
}
