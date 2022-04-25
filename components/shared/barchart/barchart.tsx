import * as d3 from "d3";
import { GeoPath } from "d3";
import { useEffect, useRef } from "react";

type Props = {};

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

  svg
    .attr("width", w)
    .attr("height", h)
    .style("margin-top", 50)
    .style("margin-left", 50);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 40)
    .attr("y", (d, i) => h - 10 * d)
    .attr("width", 20)
    .attr("height", (d, i) => d * 10)
    .attr("fill", "steelblue");
};

export default function BarChart({}: Props) {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    drawChart(svg);
  }, [svg]);

  return (
    <>
      <div id="body">
        <div id="map">
          <svg ref={svg} />
        </div>
      </div>
    </>
  );
}
