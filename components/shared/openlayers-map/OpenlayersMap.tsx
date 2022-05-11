import { useEffect, useRef } from "react";
import React from "react";
import { renderMap } from "./renderMap";

type Props = {};

export default function OpenlayersMap({}: Props) {
  // https://blog.ag-grid.com/avoiding-react-18-double-mount/
  const calledOnce = useRef(false);

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    renderMap(mapRef);
  }, [mapRef]);

  return (
    <>
      <div id="map" ref={mapRef} className="h-96 w-full"></div>
    </>
  );
}
