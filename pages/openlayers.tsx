import type { NextPage } from "next";
import OpenlayersMap from "../components/shared/openlayers-map/OpenlayersMap";

const D3Page: NextPage = () => {
  return (
    <>
      <div className="flex justify-center py-8">
        <h1 className="text-4xl font-medium">
          Openlayers: Interactive maps on the web
        </h1>
      </div>
      <div className="flex justify-center">
        <OpenlayersMap />
      </div>
    </>
  );
};

export default D3Page;
