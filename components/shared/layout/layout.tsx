import { ReactNode } from "react";
import AppHtmlHeader from "../appheader/appheader";
import Footer from "../footer/footer";
import NavBar from "../navbar/navbar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <AppHtmlHeader />
      <NavBar />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
