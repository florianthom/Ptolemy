import { MapSettings as MS } from "../util/mapSettings";
import {
  createTooltipDistrict,
  getXTooltip,
  getYTooltip,
} from "../util/mapTooltip";
import { AppCapitalJson } from "../types/AppCapitalJson";
import { projection } from "../util/mapCalculations";

export function renderCapitals(rootData: AppCapitalJson[], g0) {
  // console.log(rootData);

  const capitalTooltip = createTooltipDistrict();

  g0.append("g")
    .selectAll(".capitalMarker")
    .data(rootData)
    .enter()
    .append("circle")
    .attr("class", "capitalMarker")
    .attr("cx", (datum) => {
      const result = projection([datum.latlng[1], datum.latlng[0]])![0];
      return result;
    })
    .attr("cy", (datum) => {
      const result = projection([datum.latlng[1], datum.latlng[0]])![1];
      return result;
    })
    .attr("r", MS.MARKER_SIZE)
    .attr("fill", (datum, index: number) => MS.MARKER_COLOR)
    .attr("fill-opacity", 0.5)
    .attr("cursor", "default")
    .on("mouseover", function (event, datum) {
      capitalTooltip
        .html(
          "<div>test: " +
            datum.capital +
            "</div>" +
            "<div>test: " +
            datum.latlng +
            "</div>"
        )
        .style("visibility", "visible")
        // @ts-ignore
        // number adjusted till fitted not calcuted here
        .style("left", getXTooltip(this, capitalTooltip, -250) + "px")
        // @ts-ignore
        // number adjusted till fitted not calcuted here
        .style("top", getYTooltip(this, capitalTooltip, -150) + "px")
        .style("visibility", "visible");
    })
    .on("mouseout", () => {
      capitalTooltip.style("visibility", "hidden");
    })
    .on("click", (event, datum) => {
      // this.router.navigate([this.baseUrlNavigation! + data.id]);
    });
}
