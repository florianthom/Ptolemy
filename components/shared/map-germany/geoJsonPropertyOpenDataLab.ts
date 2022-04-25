export interface AppGeoJsonProperties {
  // source: OpenDataLab
  // kurzbeschreibung gegeben
  //  für mehr informationen siehe https://sg.geodatenzentrum.de/web_public/gdz/dokumentation/deu/vg250_12-31.pdf

  // ade = administrative ebene, e.g. 1. staat, 2. land, 3. regierungsbezirk, 4. kreis
  ADE: number;
  // ags = amtlicher gemeindeschlüssel, z.B. 2.+3.stelle= kennzahl des landes, mehr siehe  (kann mehrere postleitzahlen beinhalten)
  AGS: string;
  // AGS_0	aufgefüllter Amtlicher Gemeindeschlüssel, grundsätzlich 8-stelliger AGS (mit Nullen rechtsseitig aufgefüllt)
  AGS_0: string;
  // bem = differenzierte Beschreibung für das attribut bez, z.B. kreisfrei, gemeinschaftsfrei
  BEM: string;
  // BEZ	amtliche Bezeichnung der Verwaltungseinheit
  BEZ: string;
  // bsg	besondere gebiete, z.B. 1. = Deutschland 9. = Bodensee
  BSG: number;
  // debkg_id	dlm-identifikator (identifikator aus dem dlm250)
  DEBKG_ID: string;
  // fk_s3	funktion der 3. schlüsselstelle, z:B. r = regierungsbezirk, k = kreis
  FK_S3: string;
  // GEN	Geographischer Name
  GEN: string;
  // gf	geofaktor, z.B. 1.=ohne Struktur und Gewässer, 3. ohne struktur land
  GF: number;
  // ibz	identifikator: ist eine produktspezifische kennummer für das attribut bez
  IBZ: number;
  // nbd	namensbildung, z.B. ja=bezeichnung ist teil des namens, nein=bezeichnung ist nicht teil des namens
  NBD: string;
  // nuts	europäischer statistikschlüssel
  NUTS: string;
  // rs	(auch ars): Amtlicher Regionalschlüssel: 2. stelle=kennzahl des landes, 3. stelle = kennzahl des regierungsbezirks
  RS: string;
  // RS_0	(auch ars_0) aufgefüllter Amtlicher Regionalschlüssel grundsätzlich 12-stelliger ARS (mit Nullen rechtsseitig aufgefüllt)
  RS_0: string;
  // sdv_rs (auch sdv_ars): Sitz der Verwaltung (Amtlicher Regionalschlüssel) ARS der Gemeinde, der den Sitz der Verwaltung repräsentiert (für ADE 6 identisch mit ARS)
  SDV_RS: string;
  // sn_g	Gemeinde
  SN_G: string;
  // sn_k:	Kreis
  SN_K: string;
  // sn_l	Land
  SN_L: string;
  // sn_r	regierungsbezirk
  SN_R: string;
  // sn_v1	verwaltungsgemeinschaft (vorderer teil)
  SN_V1: string;
  // sn_v2	verwaltungsgemeinschaft (hinterer teil)
  SN_V2: string;
  // wsk	wirksamkeit, ab wann ist eine änderung juristisch wirksam
  WSK: string;
}
