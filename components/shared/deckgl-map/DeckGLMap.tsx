import { useEffect, useRef } from "react";
import React from "react";
// import { ViewStateProps } from "@deck.gl/core/lib/deck";
// import { DeckGL } from "deck.gl";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import Map from "react-map-gl";

type Props = {};

export default function DeckGLMap({}: Props) {
  const calledOnce = useRef(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Set your mapbox access token here
  // const MAPBOX_ACCESS_TOKEN =
  //   "pk.eyJ1IjoiZmxvcmlhbnRob20iLCJhIjoiY2wzNjM4bGVxMHhmaTNncXN1cmZkbzVuOSJ9.BzyNp1u_R3gI43p4E-8JrA";

  // https://docs.mapbox.com/api/maps/styles/
  // mapStyle="mapbox://styles/mapbox/light-v10"
  // mapStyle="mapbox://styles/mapbox/dark-v10"
  // mapStyle="mapbox://styles/mapbox/outdoors-v11"
  const mapStyle = "mapbox://styles/mapbox/light-v10";

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
    <>
      <div id="map" ref={mapRef} className="h-screen w-full">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
        >
          <Map
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 3.5,
            }}
            style={{ width: 600, height: 400 }}
            mapStyle={mapStyle}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      </div>
    </>
  );
}
