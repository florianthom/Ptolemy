import { useEffect, useRef } from "react";
import React from "react";
import { renderMap } from "./renderMap";
import { Map } from "ol";
import { addInteraction, draw } from "./layers/drawLayer";
import { useGeographic } from "ol/proj";

type Props = {};

export default function OpenlayersMap({}: Props) {
  // https://blog.ag-grid.com/avoiding-react-18-double-mount/
  const calledOnce = useRef(false);
  const mapRef = useRef<HTMLDivElement>(null);
  let map: Map;

  // useGeographic();
  useEffect(() => {
    if (calledOnce.current) return;

    calledOnce.current = true;
    map = renderMap(mapRef);
  }, [mapRef]);

  return (
    <div className="w-full">
      <div id="map" ref={mapRef} className="h-192"></div>
      <div className="flex justify-center p-16">
        <form className="">
          <label htmlFor="type-selector">Geometry type &nbsp;</label>
          <select
            id="type-selector"
            onChange={(a) => {
              map.removeInteraction(draw);
              addInteraction(map, a.target.value as string);
            }}
          >
            <option value="None">None</option>
            <option value="LineString">LineString</option>
            <option value="Polygon">Polygon</option>
            <option value="Circle">Circle</option>
          </select>
        </form>
      </div>
    </div>
  );
}
