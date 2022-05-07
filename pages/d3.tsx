import type { NextPage } from "next";
import ConditionallyRender from "../components/shared/conditionally-render/ConditionallyRender";
import WorldMap from "../components/shared/world-map/WorldMap";

const D3Page: NextPage = () => {
  return (
    <>
      <div className="flex justify-center py-8">
        <h1 className="text-4xl font-medium">D3.js: Data-Driven Documents</h1>
      </div>
      <div className="flex justify-center">
        <WorldMap />
      </div>
    </>
  );
};

export default D3Page;
