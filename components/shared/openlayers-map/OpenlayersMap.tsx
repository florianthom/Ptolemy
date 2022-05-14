import { useEffect, useRef } from "react";
import React from "react";
import { renderMap } from "./renderMap";
import { Map } from "ol";
import { draw } from "./layers/drawLayer";

type Props = {};

export default function OpenlayersMap({}: Props) {
  // https://blog.ag-grid.com/avoiding-react-18-double-mount/
  const calledOnce = useRef(false);
  const mapRef = useRef<HTMLDivElement>(null);
  let map: Map;

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    map = renderMap(mapRef);
  }, [mapRef]);

  typeSelect.onchange = function () {};

  return (
    <>
      <div id="map" ref={mapRef} className="h-screen w-full"></div>

      <form className="form-inline">
        <label htmlFor="type">Geometry type &nbsp;</label>
        <select
          id="type"
          onChange={(a) => {
            map.removeInteraction(draw);
            addInteraction();
          }}
        >
          <option value="LineString">LineString</option>
          <option value="Polygon">Polygon</option>
          <option value="Circle">Circle</option>
          <option value="None">None</option>
        </select>
      </form>
    </>
  );
}
