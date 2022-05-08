import * as d3 from "d3";
import { MapSettings as MS } from "./mapSettings";
import { GeoPath, GeoPermissibleObjects } from "d3";

export const projection = d3
  .geoMercator() // .geoOrthographic()
  .center([13, 52.5]) // location at start
  .scale(500) // initial zoom
  .translate([MS.WIDTH / 2, MS.HEIGHT / 2]);

export const geoGenerator: GeoPath<any, GeoPermissibleObjects> = d3
  .geoPath()
  .projection(projection);
