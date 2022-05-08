export interface AppGeoJson {
  // source: Geojson-Maps
  // url: https://geojson-maps.ash.ms/

  // inspect json: https://jsoninspect.com/
  // inspect data: https://geojson.io/#map=6/45.344/5.120

  // e.g. "The Bahamas"
  sovereignt: string;
  // e.g. "BHS"
  sov_a3: string;
  // e.g. Commonwealth of the Bahamas
  formal_en: string;
  // e.g. 309156
  pop_est: number;
  // e.g. 6. developing region
  economy: string;
  // e.g. north america
  continent: string;
  // e.g. caribbean
  subregion: string;
  // e.g. "4. Lower middle income"
  income_grp: string;
}
