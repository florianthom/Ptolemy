import Head from "next/head";

type Props = {};

export default function AppHtmlHeader({}: Props) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="Ptolemy"
          content="Different card visualizations with various tools"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
