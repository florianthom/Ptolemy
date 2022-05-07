import * as d3 from "d3";
import { ZoomBehavior, Selection, ZoomedElementBaseType } from "d3";
import { MapSettings as MS } from "./mapSettings";

export const installZooming = (svg: any, g0: any) => {
  const zoomBehavior = d3
    .zoom()
    .scaleExtent(MS.ZOOM_THRESHOLD)
    .on("zoom", (event) => onZoom(g0, event));

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

export const registerButtonZoomHandler = (
  svg: any,
  zoomer: ZoomBehavior<Element, unknown>
) => {
  d3.select("#btn-zoom-in").on("click", () =>
    clickToZoom(svg, zoomer, MS.ZOOM_IN_STEP)
  );
  d3.select("#btn-zoom-out").on("click", () =>
    clickToZoom(svg, zoomer, MS.ZOOM_OUT_STEP)
  );
};

export function clickToZoom(svg: any, zoomer: any, zoomStep: number) {
  svg.transition().duration(MS.ZOOM_DURATION).call(zoomer.scaleBy, zoomStep);
}

// sometimes also called zoomed / redraw
// proper semantic scaling explain in: https://stackoverflow.com/questions/21344340/semantic-zooming-of-the-force-directed-graph-in-d3
export function onZoom(g0: any, event: any): void {
  g0.attr("transform", event.transform);

  // rescaling of circles/text/... to pseudo-semantic-scaling
  // semantic scaling in d3.js = zooming without lines / strokes / ... gets bigger
  // event.transform.k = zoom scale
  // rescale marker always except when panning since to much calculations (which are not needed since no rescaling required)
  //
  //
  // if (
  //   event.sourceEvent == null ||
  //   (event.sourceEvent.movementX === 0 && event.sourceEvent.movementY === 0)
  // ) {
  //   this.authoritieMarkersInMap?.attr('r', () => {
  //     return this.authorityMarkerSize / Math.max(1, event.transform.k);
  //   });
  //   this.gTextElements?.attr(
  //     'font-size',
  //     this.fontsize / Math.max(1, event.transform.k)
  //   );
  // }
}
