import { useEffect, useRef } from "react";
import React from "react";
// import { ViewStateProps } from "@deck.gl/core/lib/deck";
// import { DeckGL } from "deck.gl";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";

type Props = {};

export default function DeckGLMap({}: Props) {
  const calledOnce = useRef(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Set your mapbox access token here
  const MAPBOX_ACCESS_TOKEN = "your_mapbox_token";

  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const data = [
    {
      sourcePosition: [-122.41669, 37.7853],
      targetPosition: [-122.41669, 37.781],
    },
  ];

  const layers = [new LineLayer({ id: "line-layer", data })];

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
  }, [mapRef]);

  return (
    // <>
    <div id="map" ref={mapRef} className="h-96 w-full">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      />
    </div>
    // </>
  );
}
