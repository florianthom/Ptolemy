import type { NextPage } from "next";
import dynamic from "next/dynamic";

const DeckGL: NextPage = () => {
  const DeckGLMapNoSSR = dynamic(
    () => import("../components/shared/deckgl-map/DeckGLMap"),
    {
      loading: () => <p>A map is loading, a loading-spinner is missing.</p>,
      ssr: false,
    }
  );

  return (
    <>
      <div className="flex justify-center py-8">
        <h1 className="text-4xl font-medium">DeckGL: Interactive data maps</h1>
      </div>
      <div className="flex justify-center">
        <DeckGLMapNoSSR />
      </div>
    </>
  );
};

export default DeckGL;
