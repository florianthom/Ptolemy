import type { NextPage } from "next";
import dynamic from "next/dynamic";
import OpenlayersMap from "../components/shared/openlayers-map/OpenlayersMap";

const DeckGL: NextPage = () => {
  const OpenlayersOfflineMapNoSSR = dynamic(
    () =>
      import(
        "../components/shared/openlayers-offline-map/OpenlayersOfflineMap"
      ),
    {
      loading: () => <p>A map is loading, a loading-spinner is missing.</p>,
      ssr: false,
    }
  );

  return (
    <>
      <div className="flex justify-center py-8">
        <h1 className="text-4xl font-medium">
          Openlayers: Interactive maps on the web
        </h1>
      </div>
      <div className="flex justify-center">
        <OpenlayersOfflineMapNoSSR />
      </div>
    </>
  );
};

export default DeckGL;
