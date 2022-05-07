import * as d3 from "d3";
import { MapSettings as MS } from "./mapSettings";
import { Feature, FeatureCollection, Geometry } from "geojson";
import { AppGeoJsonProperties } from "./geoJsonPropertyOpenDataLab";
import { installZooming } from "./mapZoom";
import {
  createTooltipDistrict,
  onMouseOutDistrictPath,
  onMouseOverDistrictPath,
} from "./mapTooltip";
import { GeoPath, GeoPermissibleObjects } from "d3";

export const createChart = (svgRef: React.RefObject<SVGSVGElement>) => {
  // needed since component gets rendered >1 times (?)
  d3.select(svgRef.current).selectAll("*").remove();

  const svg = d3
    .select(svgRef.current)
    .attr("width", MS.WIDTH + MS.MARGIN.LEFT + MS.MARGIN.RIGHT)
    // .attr("width", "100%")
    .attr("height", MS.HEIGHT + MS.MARGIN.TOP + MS.MARGIN.BOTTOM);

  const color = d3
    .scaleLinear()
    .domain([1, 20])
    .range(["lightblue", "steelblue"] as Iterable<number>); // ["#DCDCDC", "#C0C0C0"]

  const g0 = svg
    .append("g")
    .attr("class", "g-base")
    .attr(
      "transform",
      "translate(" + MS.MARGIN.LEFT + "," + MS.MARGIN.TOP + ")"
    );

  const tooltipDistrict = createTooltipDistrict();

  installZooming(svg, g0);

  const projection = d3
    .geoMercator()
    // .geoOrthographic()
    // coordinates of location which should be centered at start
    .center([13, 52.5])
    // zoom
    .scale(9000)
    .translate([MS.WIDTH / 2, MS.HEIGHT / 2]);

  const constructMapFromData = (
    rootData: FeatureCollection<Geometry, AppGeoJsonProperties>
  ) => {
    // console.log("data: ", rootData.features);
    const geoGenerator: GeoPath<any, GeoPermissibleObjects> = d3
      .geoPath()
      .projection(projection);

    const mapPaths = g0
      .append("g")
      .selectAll(".mapPath")
      .data(rootData.features)
      .enter()
      .append("path")
      .attr("class", "mapPath")
      // add html5 data attributes
      // https://stackoverflow.com/questions/13188125/d3-add-multiple-classes-with-function/26022895
      .attr("gen", (data, index) => {
        return data.properties.GEN;
      })
      .attr("d", (data: Feature) => {
        return geoGenerator(data);
      })
      .attr("fill", (data, index) => color(index))
      .attr("stroke", "#FFF")
      .attr("stroke-width", 0.5)
      .on("mouseover", function (event, data) {
        const tmpElement = d3.select(this);
        onMouseOverDistrictPath(tmpElement, data, tooltipDistrict);
      })
      .on("mouseout", function (event, data) {
        const tmpElement = d3.select(this);
        onMouseOutDistrictPath(tmpElement, tooltipDistrict);
      });
  };

  // @ts-ignore
  d3.json("landkreise_simplify200.geojson").then(constructMapFromData);
};
