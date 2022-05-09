import type { NextPage } from "next";
import dynamic from "next/dynamic";

const D3Page: NextPage = () => {
  const LeafletMapLazy = dynamic(
    () => import("../components/shared/leaflet-map/LeafletMap"),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false,
    }
  );
  return (
    <>
      <div className="flex justify-center py-8">
        <h1 className="text-4xl font-medium">
          Leaflet: A JavaScript library for interactive maps
        </h1>
      </div>
      <div className="flex justify-center">
        <LeafletMapLazy />
      </div>
    </>
  );
};

export default D3Page;
