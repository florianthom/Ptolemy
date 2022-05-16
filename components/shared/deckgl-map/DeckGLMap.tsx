import { useEffect, useRef, useState } from "react";
import React from "react";
import DeckGL from "@deck.gl/react";
import { PolygonLayer } from "@deck.gl/layers";
import ReactMap, { FullscreenControl } from "react-map-gl";
import { AmbientLight } from "deck.gl";
import { PointLight } from "deck.gl";
import { LightingEffect } from "deck.gl";
import { TripsLayer } from "deck.gl";
import { RGBAColor } from "deck.gl";
import { Building } from "./types/building";
import { Trip } from "./types/trip";
import { LandCover } from "./types/landCover";
import { AttributionControl } from "react-map-gl";
import { createTripsLayer } from "./layers/tripsLayer";
import { createGroundLayer } from "./layers/groundLayer";
import { createBuildingsLayer } from "./layers/buildingsLayer";
import mapboxgl, { LngLatLike, Map, MapboxOptions } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {};

// https://deck.gl/examples/trips-layer/
// https://github.com/visgl/deck.gl/blob/8.7-release/examples/website/trips/app.js
// https://ckochis.com/deck-gl-time-frame-animations

export default function DeckGLMap({}: Props) {
  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0,
  });

  const pointLight = new PointLight({
    color: [255, 255, 255],
    intensity: 2.0,
    position: [-74.05, 40.7, 8000],
  });

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
    zoom: 12.5,
    // default mapbox pitch: 60, can increase to 85 but not higher
    maxPitch: 60,
    pitch: 60,
    bearing: 0,
  };

  const loopLength = 1800;
  const animationSpeed = 0.25;

  const [time, setTime] = useState(0);

  // possible type: Animation
  const [animation] = useState({} as { id: number });

  const animate = () => {
    setTime((t) => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  const mapContainer = useRef<HTMLDivElement>(null);

  let map: Map;

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  const lightingEffect = new LightingEffect({ ambientLight, pointLight });

  const effects = [lightingEffect];

  const layers = [
    createGroundLayer(),
    createTripsLayer(time),
    createBuildingsLayer(),
  ];

  return (
    <>
      <div id="map" className="relative my-16" style={{ height: "100vh" }}>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          effects={effects}
          layers={layers}
          controller={{ scrollZoom: false /*{ smooth: true, speed: 0.01 } */ }}
        >
          <ReactMap
            reuseMaps={true}
            maxPitch={INITIAL_VIEW_STATE.maxPitch}
            mapStyle={mapStyle}
            styleDiffing={true}
            attributionControl={false}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          >
            <FullscreenControl />
            <AttributionControl
              customAttribution={""}
              compact={true}
              position={"top-right"}
            />
          </ReactMap>
        </DeckGL>
      </div>
    </>
  );
}

// const mapOptions: MapboxOptions = {
//   container: mapContainer.current!,
//   maxPitch: INITIAL_VIEW_STATE.maxPitch,
//   style: mapStyle,
//   attributionControl: false,
//   center: [-87.903982, 43.020403] as LngLatLike,
//   zoom: 12,
//   accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
// };

// map = new Map(mapOptions);
// map.addControl(new mapboxgl.FullscreenControl());
// map.addLayer(...);
// return () => map.remove();

// <>
//   <div
//     id="map"
//     ref={mapContainer}
//     className="absolute top-0 bottom-0 w-full"
//     style={{ height: "100vh" }}
//   ></div>
// </>
