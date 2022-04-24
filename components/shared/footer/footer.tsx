import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
  return (
    <>
      <footer className="bg-gray-200 text-center lg:text-left py-5">
        <div className="container p-6 text-gray-800">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="mb-6 md:mb-0">
              <h5 className="font-medium mb-2 uppercase">Maps</h5>

              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                atque ea quis molestias. Fugiat pariatur maxime quis culpa
                corporis vitae repudiandae aliquam voluptatem veniam, est atque
                cumque eum delectus sint!
              </p>
            </div>

            <div className="mb-6 md:mb-0">
              <h5 className="font-medium mb-2 uppercase">Vektor Graphics</h5>

              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                atque ea quis molestias. Fugiat pariatur maxime quis culpa
                corporis vitae repudiandae aliquam voluptatem veniam, est atque
                cumque eum delectus sint!
              </p>
            </div>
          </div>
        </div>

        <div
          className="text-center text-gray-700 p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2);" }}
        >
          © 2022 Copyright:{" "}
          <Link href="/">
            <a className="text-gray-800">Ptolemy Media</a>
          </Link>
        </div>
      </footer>
    </>
  );
}
