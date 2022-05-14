import { useEffect, useRef } from "react";
import React from "react";
// import { ViewStateProps } from "@deck.gl/core/lib/deck";
// import { DeckGL } from "deck.gl";
import DeckGL from "@deck.gl/react";
import { ArcLayer, GeoJsonLayer, LineLayer } from "@deck.gl/layers";
import Map, { NavigationControl } from "react-map-gl";

type Props = {};

export default function DeckGLMap({}: Props) {
  // source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
  const AIR_PORTS =
    "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

  const NAV_CONTROL_STYLE = {
    position: "absolute",
    top: 10,
    left: 10,
  };

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

  const onClick = (info) => {
    if (info.object) {
      // eslint-disable-next-line
      alert(
        `${info.object.properties.name} (${info.object.properties.abbrev})`
      );
    }
  };

  // const data = [
  //   {
  //     sourcePosition: [-122.41669, 37.7853],
  //     targetPosition: [-122.41669, 37.781],
  //   },
  // ];

  const geoJsonLayer = new GeoJsonLayer({
    id: "airports",
    data: AIR_PORTS,
    // Styles
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 2000,
    getPointRadius: (f) => 11 - f.properties.scalerank,
    getFillColor: [200, 0, 80, 180],
    // Interactive props
    pickable: true,
    autoHighlight: true,
    onClick,
  });

  const arcLayer = new ArcLayer({
    id: "arcs",
    data: AIR_PORTS,
    dataTransform: (d) => d.features.filter((f) => f.properties.scalerank < 4),
    // Styles
    getSourcePosition: (f) => [-0.4531566, 51.4709959], // London
    getTargetPosition: (f) => f.geometry.coordinates,
    getSourceColor: [0, 128, 200],
    getTargetColor: [200, 0, 80],
    getWidth: 1,
  });

  // new LineLayer({ id: "line-layer", data });
  const layers = [geoJsonLayer, arcLayer];

  return (
    <>
      <div id="map" className="">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
          ContextProvider={MapContext.Provider}
        >
          <Map
            mapStyle={mapStyle}
            {...settings}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          />
          <NavigationControl style={NAV_CONTROL_STYLE} />
        </DeckGL>
      </div>
    </>
  );
}
