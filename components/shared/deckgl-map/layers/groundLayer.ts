import { PolygonLayer, PolygonLayerProps } from "@deck.gl/layers";
import { RGBAColor } from "deck.gl";
import { LandCover } from "../types/landCover";

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

export function createGroundLayer(): PolygonLayer<
  LandCover,
  PolygonLayerProps<LandCover>
> {
  const groundLayer = new PolygonLayer<LandCover>({
    id: "ground",
    data: landCover,
    getPolygon: (f) => f.path,
    stroked: true,
    filled: false,
    // ignored since filled=false
    getFillColor: [255, 255, 255] as RGBAColor,
  });
  return groundLayer;
}
