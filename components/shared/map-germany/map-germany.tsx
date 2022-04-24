type Props = {};

export default function Layout({}: Props) {
  return (
    <>
      <div id="body">
        {/* <div id="btn-zoom">
          <button
            id="btn-zoom--in"
            className="k-icon k-i-zoom-in zoom-button same-height-width padding-5"
            aria-hidden="true"
          ></button>
          <button
            id="btn-zoom--out"
            className="k-icon k-i-zoom-out zoom-button same-height-width padding-5"
            aria-hidden="true"
          >
            --
          </button>
        </div> */}
        <div id="map" style={{}}></div>
      </div>
    </>
  );
}
