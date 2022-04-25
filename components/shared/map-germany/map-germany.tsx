import * as d3 from "d3";
import { GeoPath } from "d3";
import { useEffect, useRef } from "react";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import { AppGeoJsonProperties } from "./geoJsonPropertyOpenDataLab";

// zumachen
// set size
// go for country instead of state
// color schema
// zoom

// d3 - base structure:
//
// selectAll(nameX) -> data -> enter -> append(g) -> attr(class, nameX)
// nameX has to match
// g1.selectAll(".gSpecificClass")
//  .data([1])
//  .enter()
//  .append("g")
//  .attr("class", "gSpecificClass");

// maps + d3.js-geo: most basic facts
//
// geojson vs topojson -> topojson is optimized
// geojson = (lat,long) pairs
//
// projection
// A projection function takes a longitude and latitude co-ordinate (in the form of an array [lon, lat]) and transforms it into an x and y co-ordinate:
// breitengrad = --- = latitude = lat = winkelmaß in Grad (°)
// längengrad =  ||| = longitude
// [13, 52.5] == [long, lat]== 13° östliche länge (bei minus = westliche länge) & 52.5° nördliche breite (bei minus = südliche breite)
//
// A geographic path generator is a function that takes a GeoJSON object and converts it into an SVG path string. (In fact, it’s just another type of shape generator.)

type Props = {};

const onMouseOverDistrictPath = (
  pathElement: any,
  data: Feature<Geometry, AppGeoJsonProperties>,
  tooltipDistrict: any
) => {
  pathElement.attr("fill-opacity", 0.6);
  pathElement.attr("stroke-width", 2.5);
  tooltipDistrict
    .html(
      "<div>" +
        "<div>" +
        data.properties.BEZ +
        ": " +
        data.properties.GEN +
        (data.properties.BEZ === "Landkreis"
          ? " (" + data.properties.SN_K + ")" + "</div>"
          : "</div>") +
        "<div>" +
        "Regionalschlüssel: " +
        data.properties.SDV_RS +
        "</div>" +
        "<div>" +
        "Amtlicher Gemeindeschlüssel: " +
        data.properties.AGS +
        "</div>" +
        "<div>" +
        "Europäischer Statistikschlüssel: " +
        data.properties.NUTS +
        "</div>" +
        "</div>"
    )
    .style("visibility", "visible");
};

const onMouseOutDistrictPath = (pathElement: any, tooltipDistrict: any) => {
  pathElement.attr("fill-opacity", 1.0);
  pathElement.attr("stroke-width", 0.5);
  tooltipDistrict.style("visibility", "hidden");
};

const drawChart = (svgRef: React.RefObject<SVGSVGElement>) => {
  const data = [12, 5, 6, 6, 9, 10];

  // constants
  const margin = { top: 10, right: 80, bottom: 75, left: 60 };
  const h = 700 - margin.top - margin.bottom;
  const w = 600 - margin.left - margin.right;

  // initialization
  const svg = d3
    .select(svgRef.current)
    .attr("class", "svg-class")
    .attr("width", w + margin.left + margin.right)
    .attr("width", "100%")
    .attr("height", h + margin.top + margin.bottom)
    .attr("style", "outline: thin solid black;");

  const tooltipDistrict = d3
    .select("#map")
    .append("div")
    .attr("class", "gInformationWindowRect")
    .style("position", "absolute")
    .style("left", margin.left + "px")
    .style("top", h + "px")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "0px")
    .style("padding", "5px")
    .style("font-size", 12 + "px");

  const color = d3
    .scaleLinear()
    .domain([1, 20])
    // @ts-ignore
    .range(["#DCDCDC", "#C0C0C0"]);

  const g0 = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // draw map

  const projection = d3
    .geoMercator()
    // .geoOrthographic()
    // coordinates of location which should be centered at start
    .center([13, 52.5])
    // zoom
    .scale(10000)
    .translate([w / 2, h / 2]);

  const constructMapFromData = (
    rootData: FeatureCollection<Geometry, AppGeoJsonProperties>
  ) => {
    // console.log("data: ", rootData.features);
    const geoGenerator: GeoPath<any, d3.GeoPermissibleObjects> = d3
      .geoPath()
      .projection(projection);

    const mapPaths = g0
      .append("g")
      .selectAll(".mapPath")
      .data(rootData.features)
      .enter()
      .append("path")
      .attr("class", "mapPath")
      // add html5 data attributes (is recommended: https://stackoverflow.com/questions/13188125/d3-add-multiple-classes-with-function/26022895)
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

export default function MapGermany({}: Props) {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    drawChart(svg);
  }, [svg]);

  return (
    <>
      <div id="body">
        <div id="btn-zoom">
          <button
            id="btn-zoom--in"
            className="k-icon k-i-zoom-in zoom-button same-height-width padding-5"
            aria-hidden="true"
          >
            ++
          </button>
          <button
            id="btn-zoom--out"
            className="k-icon k-i-zoom-out zoom-button same-height-width padding-5"
            aria-hidden="true"
          >
            --
          </button>
        </div>
        <div id="map">
          <svg ref={svg} />
        </div>
      </div>
    </>
  );
}
