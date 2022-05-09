import type { NextPage } from "next";
import LeafletMap from "../components/shared/leaflet-map/LeafletMap";

const D3Page: NextPage = () => {
  return (
    <>
      <div className="flex justify-center py-8">
        <h1 className="text-4xl font-medium">
          Leaflet: A JavaScript library for interactive maps
        </h1>
      </div>
      <div className="flex justify-center">
        <LeafletMap />
      </div>
    </>
  );
};

export default D3Page;
