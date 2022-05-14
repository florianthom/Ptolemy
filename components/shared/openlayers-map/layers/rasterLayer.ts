import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export function rasterLayer() {
  return new TileLayer({
    source: new OSM(),
  });
}
