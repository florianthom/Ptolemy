import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { OverviewMap } from "ol/control";

export function createOverviewMapControl(): OverviewMap {
  const overviewMap = new OverviewMap({
    // see in overviewmap-custom.html to see the custom CSS used
    className: "ol-overviewmap ol-custom-overviewmap",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    collapseLabel: "\u00BB",
    label: "\u00AB",
    collapsed: false,
  });
  return overviewMap;
}
