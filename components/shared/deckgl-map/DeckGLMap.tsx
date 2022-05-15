import {
  AnimationEvent,
  AnimationEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
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
import Map, { NavigationControl, Point } from "react-map-gl";
import { AmbientLight } from "deck.gl";
import { PointLight } from "deck.gl";
import { LightingEffect } from "deck.gl";
import { TripsLayer } from "deck.gl";
import { Position } from "deck.gl";
import { RGBAColor } from "deck.gl";
import { Building } from "./types/building";
import { Trip } from "./types/trip";
import { LandCover } from "./types/landCover";
import { AnimationOptions } from "mapbox-gl";

type Props = {};

// https://deck.gl/examples/trips-layer/
// https://github.com/visgl/deck.gl/blob/8.7-release/examples/website/trips/app.js

export default function DeckGLMap({}: Props) {
  // data
  // https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json
  // https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json
  const BUILDINGS_URL = "buildings.json";
  const TRIPS_URL = "trips-v7.json";

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
    buildingColor: [74, 80, 87] as RGBAColor,
    trailColor0: [253, 128, 93] as RGBAColor,
    trailColor1: [23, 184, 190] as RGBAColor,
    material,
    effects: [lightingEffect],
  };

  // https://docs.mapbox.com/api/maps/styles/
  // mapbox://styles/mapbox/light-v10
  // mapbox://styles/mapbox/dark-v10
  // mapbox://styles/mapbox/outdoors-v11
  // https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json
  // mapbox://styles/florianthom/cl37enca8001x14o2i2w03mvo
  const mapStyle = "mapbox://styles/florianthom/cl37enca8001x14o2i2w03mvo";

  const INITIAL_VIEW_STATE = {
    longitude: -74,
    latitude: 40.72,
    zoom: 13,
    pitch: 45,
    bearing: 0,
  };

  const landCover: LandCover[] = [
    {
      path: [
        [-74.0, 40.7],
        [-74.02, 40.7],
        [-74.02, 40.72],
        [-74.0, 40.72],
      ],
    },
  ];

  const trailLength = 180;
  const loopLength = 1800;
  const animationSpeed = 0.25;

  const [time, setTime] = useState(0);

  // possible type: Animation
  const [animation] = useState({} as { id: number });

  const animate = () => {
    setTime((t) => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  const groundLayer = new PolygonLayer<LandCover>({
    id: "ground",
    data: landCover,
    getPolygon: (f) => f.path,
    stroked: true,
    filled: false,
    // ignored since filled=false
    getFillColor: [255, 255, 255] as RGBAColor,
  });

  const tripsLayer = new TripsLayer<Trip>({
    id: "trips",
    data: TRIPS_URL,
    getPath: (d) => d.path,
    getTimestamps: (d) => d.timestamps,
    getColor: (d) => {
      return d.vendor === 0
        ? DEFAULT_THEME.trailColor0
        : DEFAULT_THEME.trailColor1;
    },
    opacity: 0.3,
    widthMinPixels: 2,
    capRounded: true,
    jointRounded: true,
    trailLength,
    currentTime: time,
  });

  const buildingsLayer = new PolygonLayer<Building>({
    id: "buildings",
    data: BUILDINGS_URL,
    extruded: true,
    wireframe: false,
    opacity: 0.5,
    getPolygon: (f) => f.polygon,
    getElevation: (f) => f.height,
    getFillColor: DEFAULT_THEME.buildingColor,
    material: DEFAULT_THEME.material,
  });

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
