import { useEffect, useRef, useState } from "react";
import { createChart } from "./createChart";

// zumachen
// go for country instead of state
// zoom
// locations

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
  const svg = useRef<SVGSVGElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(false && isMounted);
    createChart(svg);
  }, [svg]);

  if (isMounted) {
    return null;
  }

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
          <svg ref={svg} />
        </div>
      </div>
    </>
  );
}
