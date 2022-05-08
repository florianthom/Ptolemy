export class MapSettings {
  static readonly ZOOM_DURATION: number = 500;
  static readonly ZOOM_MIN_MAX_THRESHOLD: [number, number] = [0.5, 10];
  static readonly ZOOM_IN_STEP: number = 2;
  static readonly ZOOM_OUT_STEP: number = 1 / this.ZOOM_IN_STEP;
  static readonly MARGIN = { TOP: 10, RIGHT: 80, BOTTOM: 75, LEFT: 60 };
  static readonly HEIGHT: number = 700 - this.MARGIN.TOP - this.MARGIN.BOTTOM;
  static readonly WIDTH: number = 1400 - this.MARGIN.LEFT - this.MARGIN.RIGHT;
  static readonly MARKER_SIZE: number = 7.5;
  static readonly MARKER_COLOR: string = "#000";

  static readonly FONTSIZE: number = 6;
  static readonly TOOLTIP_FONTSIZE: number = 12;
  static readonly TOOLTIP_MARGIN = {
    TOP: (8 / 10) * this.HEIGHT,
    LEFT: (1 / 10) * this.WIDTH,
  };
  static readonly MAX_NUMBER_COLORS: number = 100;
  static readonly PATH_COLOR: string = "#FFF";
  static readonly PATH_STROKE_WIDTH: number = 0.5;
  static readonly ADJUST_TEXT_COUNTRY = {
    "United States of America": [0.75, 1.5],
  };
}
