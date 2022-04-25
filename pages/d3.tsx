import type { NextPage } from "next";
import MapGermany from "../components/shared/map-germany/map-germany";

const D3Page: NextPage = () => {
  return (
    <>
      <div className="flex justify-center py-8">
        <h1 className="text-4xl font-medium">D3.js: Data-Driven Documents</h1>
      </div>
      {/* <div className="flex justify-center py-8"> */}
      <MapGermany />
      {/* </div> */}
    </>
  );
};

export default D3Page;
