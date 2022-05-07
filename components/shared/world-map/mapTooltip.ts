import * as d3 from "d3";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import { AppGeoJsonProperties } from "./geoJsonPropertyOpenDataLab";
import { MapSettings as MS } from "./mapSettings";

export const onMouseOverDistrictPath = (
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

export const onMouseOutDistrictPath = (
  pathElement: any,
  tooltipDistrict: any
) => {
  pathElement.attr("fill-opacity", 1.0);
  pathElement.attr("stroke-width", 0.5);
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
    .style("font-size", MS.FONTSIZE + "px");
};
