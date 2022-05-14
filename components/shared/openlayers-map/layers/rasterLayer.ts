import { Attribution } from "ol/control";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { ATTRIBUTION } from "ol/source/OSM";

export function rasterLayer() {
  return new TileLayer({
    source: new OSM({
      attributions: ATTRIBUTION,
    }),
  });
}
