import { PolygonLayer } from "@deck.gl/layers";
import { RGBAColor } from "deck.gl";
import { Building } from "../types/building";

// https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json
const BUILDINGS_URL = "buildings.json";

const buildingColor = [74, 80, 87] as RGBAColor;

const material = {
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70],
};

export function createBuildingsLayer() {
  const buildingsLayer = new PolygonLayer<Building>({
    id: "buildings",
    data: BUILDINGS_URL,
    extruded: true,
    wireframe: false,
    opacity: 0.5,
    getPolygon: (f) => f.polygon,
    getElevation: (f) => f.height,
    getFillColor: buildingColor,
    material: material,
  });
  return buildingsLayer;
}
