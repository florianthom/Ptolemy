import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <div>header</div>
      <main>{children}</main>
      <div>footer</div>
    </>
  );
}
