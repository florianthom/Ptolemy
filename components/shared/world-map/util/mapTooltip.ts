import * as d3 from "d3";
import { Feature, Geometry } from "geojson";
import { MapSettings as MS } from "./mapSettings";
import { AppGeoJson } from "../types/AppGeoJson";

export const onMouseOverDistrictPath = (
  pathElement: any,
  data: Feature<Geometry, AppGeoJson>,
  tooltipDistrict: any
) => {
  pathElement.attr("fill-opacity", 0.6);
  pathElement.attr("stroke-width", 5 * MS.PATH_STROKE_WIDTH);
  tooltipDistrict
    .html(
      "<div>" +
        "<div>" +
        "Name: " +
        data.properties.sovereignt +
        "</div>" +
        "Formal-Name: " +
        data.properties.formal_en +
        "</div>" +
        "Acronym: " +
        data.properties.sov_a3 +
        "</div>" +
        "<div>" +
        "Subregion: " +
        data.properties.subregion +
        "</div>" +
        "Continent: " +
        data.properties.continent +
        "</div>" +
        "<div>" +
        "Population: " +
        data.properties.pop_est +
        "</div>" +
        "<div>" +
        "Income Group: " +
        data.properties.income_grp +
        "</div>" +
        "<div>" +
        "Economy: " +
        data.properties.economy +
        "</div>" +
        "</div>"
    )
    .style("visibility", "visible");
};

export const onMouseOutDistrictPath = (
  pathElement: any,
  tooltipDistrict: any
) => {
  pathElement.attr("fill-opacity", 1.0);
  pathElement.attr("stroke-width", MS.PATH_STROKE_WIDTH);
  tooltipDistrict.style("visibility", "hidden");
};

export const createTooltipDistrict = () => {
  return d3
    .select("#map")
    .append("div")
    .attr("class", "gInformationWindowRect")
    .style("position", "absolute")
    .style("left", MS.TOOLTIP_MARGIN.LEFT + "px")
    .style("top", MS.TOOLTIP_MARGIN.TOP + "px")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "0px")
    .style("padding", "5px")
    .style("font-size", MS.TOOLTIP_FONTSIZE + "px");
};

// keep in mind where the tooltip div spawns: only with right x+y at the buttom-left-corner of edge
// - (minus) = move to top / move to left
export function getXTooltip(
  currentObject: any,
  tooltipSelection: any,
  adjustment: number
): number {
  return (
    window.pageXOffset +
    currentObject.getBoundingClientRect().x +
    adjustment -
    tooltipSelection.node().getBoundingClientRect().width / 2 +
    // // needed since svg anchor point is top left -> move to right
    currentObject.getBoundingClientRect().width / 2
  );
}

export function getYTooltip(
  currentObject: any,
  tooltipSelection: any,
  adjustment: number
): number {
  return (
    window.pageYOffset +
    currentObject.getBoundingClientRect().y +
    adjustment -
    tooltipSelection.node().getBoundingClientRect().height
    // here NOT needed since svg anchor point is top left
    // - currentObject.getBoundingClientRect().height
  );
}
