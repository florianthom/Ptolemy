import { useEffect, useRef, useState } from "react";
import React from "react";
// import { ViewStateProps } from "@deck.gl/core/lib/deck";
// import { DeckGL } from "deck.gl";
import DeckGL from "@deck.gl/react";
import {
  ArcLayer,
  GeoJsonLayer,
  LineLayer,
  PolygonLayer,
} from "@deck.gl/layers";
import Map, { NavigationControl } from "react-map-gl";
import { AmbientLight } from "deck.gl";
import { PointLight } from "deck.gl";
import { LightingEffect } from "deck.gl";
import { TripsLayer } from "deck.gl";
import { Position } from "deck.gl";

type Props = {};

export default function DeckGLMap({}: Props) {
  // const data = [
  //   {
  //     sourcePosition: [-122.41669, 37.7853],
  //     targetPosition: [-122.41669, 37.781],
  //   },
  // ];

  // Source data CSV
  const DATA_URL = {
    BUILDINGS:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json", // eslint-disable-line
    TRIPS:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json", // eslint-disable-line
  };

  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0,
  });

  const pointLight = new PointLight({
    color: [255, 255, 255],
    intensity: 2.0,
    position: [-74.05, 40.7, 8000],
  });

  const lightingEffect = new LightingEffect({ ambientLight, pointLight });

  const material = {
    ambient: 0.1,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [60, 64, 70],
  };

  const DEFAULT_THEME = {
    buildingColor: [74, 80, 87],
    trailColor0: [253, 128, 93],
    trailColor1: [23, 184, 190],
    material,
    effects: [lightingEffect],
  };

  // https://docs.mapbox.com/api/maps/styles/
  // mapStyle="mapbox://styles/mapbox/light-v10"
  // mapStyle="mapbox://styles/mapbox/dark-v10"
  // mapStyle="mapbox://styles/mapbox/outdoors-v11"
  const mapStyle =
    "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

  const INITIAL_VIEW_STATE = {
    longitude: -74,
    latitude: 40.72,
    zoom: 13,
    pitch: 45,
    bearing: 0,
  };

  const landCover = [
    [
      [-74.0, 40.7],
      [-74.02, 40.7],
      [-74.02, 40.72],
      [-74.0, 40.72],
    ],
  ];

  const trailLength = 180;
  const loopLength = 1800;
  const animationSpeed = 1;

  const [time, setTime] = useState(0);
  const [animation] = useState({});

  const animate = () => {
    setTime((t) => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  // const settings = {
  //   scrollZoom: true,
  //   boxZoom: true,
  //   dragRotate: true,
  //   dragPan: true,
  //   keyboard: true,
  //   doubleClickZoom: true,
  //   touchZoomRotate: true,
  //   touchPitch: true,
  //   minZoom: 0,
  //   maxZoom: 20,
  //   minPitch: 0,
  //   maxPitch: 85,
  // };

  const groundLayer = new PolygonLayer({
    id: "ground",
    data: landCover,
    getPolygon: (f) => f as Position[] | Position[][],
    stroked: false,
    getFillColor: [0, 0, 0, 0],
  });

  const tripsLayer = new TripsLayer({
    id: "trips",
    data: DATA_URL.TRIPS,
    getPath: (d) => d.path,
    getTimestamps: (d) => d.timestamps,
    getColor: (d) =>
      d.vendor === 0 ? DEFAULT_THEME.trailColor0 : DEFAULT_THEME.trailColor1,
    opacity: 0.3,
    widthMinPixels: 2,
    rounded: true,
    trailLength,
    currentTime: time,

    shadowEnabled: false,
  });

  const buildingsLayer = new PolygonLayer({
    id: "buildings",
    data: DATA_URL.BUILDINGS,
    extruded: true,
    wireframe: false,
    opacity: 0.5,
    getPolygon: (f) => f.polygon,
    getElevation: (f) => f.height,
    getFillColor: DEFAULT_THEME.buildingColor,
    material: DEFAULT_THEME.material,
  });

  // new LineLayer({ id: "line-layer", data });
  const layers = [groundLayer, tripsLayer, buildingsLayer];

  return (
    <>
      <div id="map" className="">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          effects={DEFAULT_THEME.effects}
          layers={layers}
          controller={true}
        >
          <Map
            reuseMaps
            mapStyle={mapStyle}
            styleDiffing={true}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      </div>
    </>
  );
}
