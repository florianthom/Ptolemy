import Geometry from "ol/geom/Geometry";
import Draw from "ol/interaction/Draw";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Map } from "ol";
import { none } from "ol/centerconstraint";

const source = new VectorSource({ wrapX: false });

// global so we can remove it later
export let draw: Draw;

export function addInteraction(map: Map, value: string) {
  if (value !== "None") {
    draw = new Draw({
      source: source,
      type: value,
      freehand: true,
    });
    map.addInteraction(draw);
  }
}

export function drawLayer(): VectorLayer<VectorSource<Geometry>> {
  return new VectorLayer({
    source: source,
  });
}
