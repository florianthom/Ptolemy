import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/shared/layout/layout";

export default function PtolemyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
