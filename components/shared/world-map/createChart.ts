import * as d3 from "d3";
import { MapSettings as MS } from "./mapSettings";
import { Feature, FeatureCollection, Geometry } from "geojson";
import { installZooming } from "./mapZoom";
import {
  createTooltipDistrict,
  onMouseOutDistrictPath,
  onMouseOverDistrictPath,
} from "./mapTooltip";
import { GeoPath, GeoPermissibleObjects } from "d3";
import { AppGeoJson } from "./AppGeoJson";
import { geoGenerator } from "./mapCalculations";

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
    // .attr("width", "100%")
    .attr("height", MS.HEIGHT + MS.MARGIN.TOP + MS.MARGIN.BOTTOM);

  const g0 = svg
    .append("g")
    .attr("class", "g-base")
    .attr(
      "transform",
      "translate(" + MS.MARGIN.LEFT + "," + MS.MARGIN.TOP + ")"
    );

  installZooming(svg, g0);

  function renderMapPaths(rootData: FeatureCollection<Geometry, AppGeoJson>) {
    // console.log("data: ", rootData.features.length);

    const tooltipDistrict = createTooltipDistrict();

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
        return data.properties.sovereignt;
      })
      .attr("d", (data: Feature) => {
        return geoGenerator(data);
      })
      .attr("fill", (data, index) =>
        createColorScale()(index % MS.MAX_NUMBER_COLORS)
      )
      .attr("stroke", MS.PATH_COLOR)
      .attr("stroke-width", MS.PATH_STROKE_WIDTH)
      .on("mouseover", function (event, data) {
        const tmpElement = d3.select(this);
        onMouseOverDistrictPath(tmpElement, data, tooltipDistrict);
      })
      .on("mouseout", function (event, data) {
        const tmpElement = d3.select(this);
        onMouseOutDistrictPath(tmpElement, tooltipDistrict);
      });

    const gCountryNameTextElements = g0
      .append("g")
      .selectAll(".mapCountryText")
      .data(rootData.features)
      .enter()
      .append("text")
      .attr("class", "mapCountryText")
      .attr("transform", (datum: Feature) => {
        const xyDatum: [number, number] = geoGenerator.centroid(datum);
        const xyDelta =
          MS.ADJUST_TEXTFIELD_COUNTRY[datum.properties!.sovereignt];
        if (xyDelta) {
          xyDatum[0] *= xyDelta[0];
          xyDatum[1] *= xyDelta[1];
          return `translate(${xyDatum})`;
        }
        return `translate(${xyDatum})`;
      })

      .attr("text-anchor", "middle")
      .attr("font-size", MS.FONTSIZE)
      .attr("cursor", "pointer")
      .text((datum: Feature) => {
        return datum.properties!.sovereignt;
      });
  }

  // @ts-ignore
  d3.json("world.geojson").then(renderMapPaths);
}
