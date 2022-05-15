import { url } from "inspector";
import type { NextPage } from "next";
import Image from "next/image";
import Background from "../public/ptolemy.jpg";

const HomePage: NextPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-full py-8">
        <h1 className="text-4xl font-medium">Ptolemy: Maps based on Math</h1>
      </div>

      <div className="w-3/6 relative mx-auto">
        <Image
          className=""
          src="/ptolemy.jpg"
          alt="Map visualization by ptolemy"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
    </>
  );
};

export default HomePage;
