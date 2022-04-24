import { url } from "inspector";
import type { NextPage } from "next";
import Image from "next/image";
import Background from "../public/ptolemy.jpg";

const D3Page: NextPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-full py-8">
        <h1 className="text-4xl font-medium">D3.js: Data-Driven Documents</h1>
      </div>
    </>
  );
};

export default D3Page;
