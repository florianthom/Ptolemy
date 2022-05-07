import { useEffect, useRef, useState } from "react";
import ButtonsZooming from "./ButtonsZooming";
import { createChart } from "./createChart";

// zumachen
// go for world instead of state
// display several locations via locator-symbol

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
// geojson here
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
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    createChart(svg);
  }, [svg]);

  return (
    <>
      <div id="map" className="relative">
        <ButtonsZooming />
        <svg ref={svg} className="outline outline-1" />
      </div>
    </>
  );
}
