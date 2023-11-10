"use client";

import { SessionProvider } from "next-auth/react";
import { Appbar } from "ui";

type Props = {
  children?: React.ReactNode;
};

// export const NextAuthProvider = ({ children }: Props) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };

export function Provider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
