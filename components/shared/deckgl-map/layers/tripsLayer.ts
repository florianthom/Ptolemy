import { TripsLayerProps } from "@deck.gl/geo-layers/trips-layer/trips-layer";
import { RGBAColor } from "deck.gl";
import { TripsLayer } from "deck.gl";
import { Trip } from "../types/trip";

// https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json
const TRIPS_URL = "trips-v7.json";

const trailColor0 = [253, 128, 93] as RGBAColor;
const trailColor1 = [23, 184, 190] as RGBAColor;

const trailLength = 180;

export function createTripsLayer(
  time: number
): TripsLayer<Trip, TripsLayerProps<Trip>> {
  const tripsLayer = new TripsLayer<Trip>({
    id: "trips",
    data: TRIPS_URL,
    getPath: (d) => d.path,
    getTimestamps: (d) => d.timestamps,
    getColor: (d) => {
      return d.vendor === 0 ? trailColor0 : trailColor1;
    },
    opacity: 0.3,
    widthMinPixels: 2,
    capRounded: true,
    jointRounded: true,
    trailLength,
    currentTime: time,
  });
  //   tripsLayer.d
  return tripsLayer;
}
