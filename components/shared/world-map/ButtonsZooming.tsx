type Props = {};

export default function ButtonsZooming({}: Props) {
  return (
    <>
      <div className="absolute top-50 left-20 z-10">
        <button
          id="btn-zoom-in"
          className="border-2 bg-transparent cursor-pointer text-2xl h-12 w-12 m-5"
        >
          +
        </button>
        <button
          id="btn-zoom-out"
          className="border-2 bg-transparent cursor-pointer text-2xl h-12 w-12 m-5"
        >
          -
        </button>
      </div>
    </>
  );
}
