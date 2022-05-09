import { useEffect } from "react";

type Props = {};

export default function LeafletMap({}: Props) {
  useEffect(() => {}, []);

  return (
    <>
      <div id="map" className=""></div>
    </>
  );
}
