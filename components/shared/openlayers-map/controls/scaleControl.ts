import { OverviewMap, ScaleLine } from "ol/control";

// https://openlayers.org/en/latest/examples/scale-line.html
export function scaleControl(): OverviewMap {
  const scaleType = "scaleline";
  const scaleBarSteps = 4;
  const scaleBarText = true;
  const unitSelected = "metric";
  let control;

  if (scaleType === "scaleline") {
    control = new ScaleLine({
      units: unitSelected,
      bar: false,
      steps: scaleBarSteps,
      text: scaleBarText,
      minWidth: 140,
    });
    return control;
  }
  control = new ScaleLine({
    units: unitSelected,
    bar: true,
    steps: scaleBarSteps,
    text: scaleBarText,
    minWidth: 140,
    className: "m-96",
  });
  return control;
}
