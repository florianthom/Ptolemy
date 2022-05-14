import Geometry from "ol/geom/Geometry";
import Draw from "ol/interaction/Draw";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { Feature, Map } from "ol";
import Style from "ol/style/Style";
import { Circle } from "ol/style";
import Fill from "ol/style/Fill";
import { Point } from "ol/geom";
import Stroke, { Options } from "ol/style/Stroke";
import { fromLonLat, Projection } from "ol/proj";

// https://openlayers.org/en/latest/examples/geographic.html
export function pointLayer(): VectorLayer<VectorSource<Geometry>> {
  const point = new Point(fromLonLat([13.49566709, 52.6310925]));

  const pointLayer = new VectorLayer({
    source: new VectorSource({
      features: [new Feature(point)],
    }),
    style: new Style({
      image: new Circle({
        radius: 3,
        fill: new Fill({ color: "black" }),
        stroke: new Stroke({
          color: "rgba(255,255,255,0.5)",
          width: 150,
        }),
      }),
    }),
  });
  console.log(pointLayer);

  return pointLayer;
}
