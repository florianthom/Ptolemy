import { useEffect, useRef } from "react";
import React from "react";
// import { ViewStateProps } from "@deck.gl/core/lib/deck";
// import { DeckGL } from "deck.gl";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import Map from "react-map-gl";

type Props = {};

export default function DeckGLMap({}: Props) {
  // https://docs.mapbox.com/api/maps/styles/
  // mapStyle="mapbox://styles/mapbox/light-v10"
  // mapStyle="mapbox://styles/mapbox/dark-v10"
  // mapStyle="mapbox://styles/mapbox/outdoors-v11"
  const mapStyle = "mapbox://styles/mapbox/light-v10";

  const INITIAL_VIEW_STATE = {
    latitude: 37.729,
    longitude: -122.36,
    zoom: 11,
    bearing: 0,
    pitch: 50,
  };

  const settings = {
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
    touchPitch: true,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85,
  };

  const data = [
    {
      sourcePosition: [-122.41669, 37.7853],
      targetPosition: [-122.41669, 37.781],
    },
  ];

  const layers = [new LineLayer({ id: "line-layer", data })];

  return (
    <>
      <div id="map" className="">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
          height={"50%"}
          width={"100%"}
        >
          <Map
            mapStyle={mapStyle}
            {...settings}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      </div>
    </>
  );
}
