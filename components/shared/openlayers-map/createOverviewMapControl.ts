import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { OverviewMap } from "ol/control";

// https://openlayers.org/en/latest/examples/overviewmap-custom.html
export function createOverviewMapControl(): OverviewMap {
  const overviewMap = new OverviewMap({
    className: "ol-overviewmap ol-custom-overviewmap",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    collapseLabel: "\u00BB",
    label: "\u00AB",
    collapsed: false,
    rotateWithView: true,
  });
  return overviewMap;
}
