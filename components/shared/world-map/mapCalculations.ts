import * as d3 from "d3";
import { MapSettings as MS } from "./mapSettings";
import { GeoPath, GeoPermissibleObjects } from "d3";

const projection = d3
  .geoMercator()
  // .geoOrthographic()
  // coordinates of location which should be centered at start
  .center([13, 52.5])
  // zoom
  .scale(500)
  .translate([MS.WIDTH / 2, MS.HEIGHT / 2]);

export const geoGenerator: GeoPath<any, GeoPermissibleObjects> = d3
  .geoPath()
  .projection(projection);
