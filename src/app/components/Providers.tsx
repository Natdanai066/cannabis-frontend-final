"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
interface Propviders {
  children: ReactNode;
}

const Providers = ({ children }: Propviders) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
