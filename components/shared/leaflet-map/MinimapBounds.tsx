import { useCallback, useEffect, useMemo, useState } from "react";
import { Rectangle, useMap, useMapEvent } from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";

type Props = { parentMap: L.Map; zoom: number };

export default function LeafletMap({ parentMap, zoom }: Props) {
  useEffect(() => {}, []);

  const BOUNDS_STYLE = { weight: 1 };

  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);

  // @ts-ignore
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}
