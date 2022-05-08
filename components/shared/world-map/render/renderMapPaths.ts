import * as d3 from "d3";
import { MapSettings as MS } from "../util/mapSettings";
import { Feature, FeatureCollection, Geometry } from "geojson";
import {
  createTooltipDistrict,
  onMouseOutDistrictPath,
  onMouseOverDistrictPath,
} from "../util/mapTooltip";
import { AppGeoJson } from "../types/AppGeoJson";
import { geoGenerator } from "../util/mapCalculations";

export function renderMapPaths(
  rootData: FeatureCollection<Geometry, AppGeoJson>,
  g0
) {
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
    .attr("sovereignt", (datum, index) => {
      return datum.properties.sovereignt;
    })
    .attr("d", (datum) => {
      return geoGenerator(datum);
    })
    .attr("fill", (datum, index) =>
      createColorScale()(index % MS.MAX_NUMBER_COLORS)
    )
    .attr("stroke", MS.PATH_COLOR)
    .attr("stroke-width", MS.PATH_STROKE_WIDTH)
    .on("mouseover", function (event, datum) {
      // @ts-ignore
      const currentElement = d3.select(this);
      onMouseOverDistrictPath(currentElement, datum, tooltipDistrict);
    })
    .on("mouseout", function (event, data) {
      // @ts-ignore
      const currentElement = d3.select(this);
      onMouseOutDistrictPath(currentElement, tooltipDistrict);
    });

  const gCountryNameTextElements = g0
    .append("g")
    .selectAll(".mapCountryText")
    .data(rootData.features)
    .enter()
    .append("text")
    .attr("class", "mapCountryText")
    .attr("transform", (datum) => {
      const xyDatum = geoGenerator.centroid(datum);
      const xyDelta = MS.ADJUST_TEXT_COUNTRY[datum.properties.sovereignt];
      if (xyDelta) {
        xyDatum[0] *= xyDelta[0];
        xyDatum[1] *= xyDelta[1];
        return `translate(${xyDatum})`;
      }
      return `translate(${xyDatum})`;
    })

    .attr("text-anchor", "middle")
    .attr("font-size", MS.FONTSIZE)
    .attr("cursor", "default")
    .text((datum) => {
      return datum.properties.sovereignt;
    })
    .on("mouseover", (event, datum) => {
      const element = d3.selectAll(
        "path[sovereignt='" + datum.properties.sovereignt + "']"
      );
      onMouseOverDistrictPath(element, datum, tooltipDistrict);
    });
}

function createColorScale() {
  const colorScale = d3
    .scaleLinear()
    .domain([1, MS.MAX_NUMBER_COLORS])
    .range(["lightblue", "steelblue"] as Iterable<number>); // ["#DCDCDC", "#C0C0C0"]
  return colorScale;
}
