import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { RefObject, useEffect, useRef } from "react";
import "ol/ol.css";
import { fromLonLat, Projection } from "ol/proj";
import { defaults } from "ol/interaction";
import Draw from "ol/interaction/Draw";
import { get as getProjection } from "ol/proj";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import { FeatureLike } from "ol/Feature";

type Props = {};

function createLayer(): VectorLayer<VectorSource<Geometry>> {
  const labelStyle = new Style({
    text: new Text({
      font: "13px Calibri,sans-serif",
      fill: new Fill({
        color: "#000",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 4,
      }),
    }),
  });

  const countryStyle = new Style({
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.6)",
    }),
    stroke: new Stroke({
      color: "#319FD3",
      width: 1,
    }),
  });

  const style = [countryStyle, labelStyle];

  const vectorLayer = new VectorLayer({
    background: "white",
    source: new VectorSource({
      url: "https://openlayers.org/data/vector/us-states.json",
      format: new GeoJSON(),
    }),
    style: function (feature: FeatureLike) {
      labelStyle
        .getText()
        .setText([
          feature.getId()!.toString(),
          "bold 13px Calibri,sans-serif",
          ` ${feature.get("name")}`,
          "",
          "\n",
          "",
          `${feature.get("density")} people/mi²`,
          "italic 11px Calibri,sans-serif",
        ]);
      return style;
    },
  });
  return vectorLayer;
}

function renderMap(mapRef: RefObject<HTMLDivElement>): Map {
  const initialMap = new Map({
    target: mapRef.current || undefined,
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
      extent: [-13882269, 2890586, -7456136, 6340207],
      showFullExtent: true,
    }),
    layers: [createLayer()],
  });
  return initialMap;
}

export default function OpenlayersOfflineMap({}: Props) {
  const calledOnce = useRef(false);

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    renderMap(mapRef);
  }, [mapRef]);

  return (
    <>
      <div id="map" ref={mapRef} className="h-192 w-full"></div>
    </>
  );
}
