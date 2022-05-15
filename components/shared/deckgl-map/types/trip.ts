import { Position } from "deck.gl";

export interface Trip {
  vendor: number;
  path: Position[];
  timestamps: number[];
}
