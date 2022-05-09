import { useEffect } from "react";

type Props = {};

export default function OpenlayersMap({}: Props) {
  useEffect(() => {}, []);

  return (
    <>
      <div id="map" className=""></div>
    </>
  );
}
