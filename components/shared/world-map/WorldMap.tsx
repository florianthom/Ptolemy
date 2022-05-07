import d3 from "d3";
import { useEffect, useRef } from "react";
import { createChart } from "./createChart";
import { MapSettings as MS } from "./mapSettings";

// zumachen
// set size
// go for country instead of state
// color schema
// zoom
// locations
// map moovement

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

export default function WorldMap({}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("class", "svg-class")
      .attr("width", MS.WIDTH + MS.MARGIN.LEFT + MS.MARGIN.RIGHT)
      .attr("width", "100%")
      .attr("height", MS.HEIGHT + MS.MARGIN.TOP + MS.MARGIN.BOTTOM)
      .attr("style", "outline: thin solid black;");
    createChart(svg);
  }, [svgRef]);

  return (
    <>
      <div id="body" className="p-16">
        <div className="absolute top-50 left-20 z-10">
          <button
            id="btn-zoom-in"
            className="border-2 bg-transparent cursor-pointer text-2xl h-12 w-12 m-5"
          >
            +
          </button>
          <button
            id="btn-zoom-out"
            className="border-2 bg-transparent cursor-pointer text-2xl h-12 w-12 m-5"
          >
            -
          </button>
        </div>
        <div id="map">
          <svg ref={svgRef} />
        </div>
      </div>
    </>
  );
}
