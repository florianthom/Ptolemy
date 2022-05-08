import * as d3 from "d3";
import { Feature, Geometry } from "geojson";
import { MapSettings as MS } from "./mapSettings";
import { AppGeoJson } from "./AppGeoJson";

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
