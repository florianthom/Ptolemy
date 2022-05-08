type Props = {};

export default function ButtonsZooming({}: Props) {
  return (
    <>
      <div className="absolute top-50 left-20 z-10">
        <button
          id="btn-zoom-in"
          className="border-2 hover:border-4 border-gray-300 bg-gray-300 bg-opacity-70 cursor-pointer text-2xl h-12 w-12 m-5"
        >
          +
        </button>
        <button
          id="btn-zoom-out"
          className="border-2 hover:border-4 border-gray-300 bg-gray-300 bg-opacity-70 cursor-pointer text-2xl h-12 w-12 m-5"
        >
          -
        </button>
      </div>
    </>
  );
}
