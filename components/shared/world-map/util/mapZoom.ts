import * as d3 from "d3";
import { ZoomBehavior } from "d3";
import { MapSettings as MS } from "./mapSettings";

export const installZooming = (svg: any, g0: any) => {
  const zoomBehavior = d3
    .zoom()
    .scaleExtent(MS.ZOOM_MIN_MAX_THRESHOLD)
    .on("zoom", (event) => {
      // onZoom (also called zoomed / redraw)
      g0.attr("transform", event.transform);

      pseudoSemanticScale(event, d3.selectAll(".mapCountryText"));
      pseudoSemanticScale(event, d3.selectAll(".capitalMarker"));
    });

  // call has to be after the g0 got created
  // adjust init zoom position since <g>-adjustment
  // svg.call
  zoomBehavior.transform(
    svg,
    d3.zoomIdentity.translate(MS.MARGIN.LEFT, MS.MARGIN.TOP)
  );

  svg.call(zoomBehavior as any);

  registerButtonZoomHandler(svg, zoomBehavior);
};

// currently no scaling applied here since no marker
// pseudo-semantic-scaling = rescaling of radius of circles/fontsize of text/...
// semantic-scaling = zooming without lines / strokes / ... gets bigger
// for proper semantic scaling see https://stackoverflow.com/questions/21344340/semantic-zooming-of-the-force-directed-graph-in-d3
function pseudoSemanticScale(event: any, elements: any) {
  // rescale marker always except when panning since to much calculations (which are not needed since no rescaling required)
  if (
    event.sourceEvent == null ||
    (event.sourceEvent.movementX === 0 && event.sourceEvent.movementY === 0)
  ) {
    // event.transform.k = zoom scale
    elements
      ?.attr("r", () => MS.MARKER_SIZE / Math.max(1, event.transform.k))
      .attr(
        "font-size",
        () => MS.TOOLTIP_FONTSIZE / Math.max(1, event.transform.k)
      );
  }
}

function registerButtonZoomHandler(
  svg: any,
  zoomer: ZoomBehavior<Element, unknown>
) {
  const tmp = svg.transition().duration(MS.ZOOM_DURATION);

  d3.select("#btn-zoom-in").on("click", () =>
    svg
      .transition()
      .duration(MS.ZOOM_DURATION)
      .call(zoomer.scaleBy, MS.ZOOM_IN_STEP)
  );
  d3.select("#btn-zoom-out").on("click", () =>
    svg
      .transition()
      .duration(MS.ZOOM_DURATION)
      .call(zoomer.scaleBy, MS.ZOOM_OUT_STEP)
  );
}
