export class MapSettings {
  static readonly ZOOM_DURATION: number = 500;
  static readonly ZOOM_THRESHOLD: [number, number] = [0.3, 100];
  static readonly ZOOM_IN_STEP: number = 2;
  static readonly ZOOM_OUT_STEP: number = 1 / this.ZOOM_IN_STEP;
  static readonly MARGIN = { TOP: 10, RIGHT: 80, BOTTOM: 75, LEFT: 60 };
  static readonly HEIGHT: number = 700 - this.MARGIN.TOP - this.MARGIN.BOTTOM;
  static readonly WIDTH: number = 600 - this.MARGIN.LEFT - this.MARGIN.RIGHT;
}
