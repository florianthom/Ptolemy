import * as d3 from "d3";
import { MapSettings as MS } from "./util/mapSettings";
import { Feature, FeatureCollection, Geometry } from "geojson";
import { installZooming } from "./util/mapZoom";
import {
  createTooltipDistrict,
  getXTooltip,
  getYTooltip,
  onMouseOutDistrictPath,
  onMouseOverDistrictPath,
} from "./util/mapTooltip";
import { GeoPath, GeoPermissibleObjects, GeoProjection } from "d3";
import { AppGeoJson } from "./types/AppGeoJson";
import { geoGenerator, projection } from "./util/mapCalculations";
import { AppCapitalJson } from "./types/AppCapitalJson";
import { renderMapPaths } from "./render/renderMapPaths";
import { renderCapitals } from "./render/renderCapitals";

function createColorScale() {
  const colorScale = d3
    .scaleLinear()
    .domain([1, MS.MAX_NUMBER_COLORS])
    .range(["lightblue", "steelblue"] as Iterable<number>); // ["#DCDCDC", "#C0C0C0"]
  return colorScale;
}

export function createChart(svgRef: React.RefObject<SVGSVGElement>) {
  // needed since component gets rendered >1 times (?)
  d3.select(svgRef.current).selectAll("*").remove();

  const svg = d3
    .select(svgRef.current)
    .attr("width", MS.WIDTH + MS.MARGIN.LEFT + MS.MARGIN.RIGHT)
    .attr("height", MS.HEIGHT + MS.MARGIN.TOP + MS.MARGIN.BOTTOM);

  const g0 = svg
    .append("g")
    .attr("class", "g-base")
    .attr(
      "transform",
      "translate(" + MS.MARGIN.LEFT + "," + MS.MARGIN.TOP + ")"
    );

  installZooming(svg, g0);

  d3.json("world.geojson").then((a: any) =>
    d3.json("capitals.json").then((b: any) => {
      renderMapPaths(a, g0);
      renderCapitals(b, g0);
    })
  );
}
