import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import AppHtmlHeader from "../appheader/appheader";
import Footer from "../footer/footer";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <AppHtmlHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
