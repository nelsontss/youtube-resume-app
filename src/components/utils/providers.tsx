"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function Providers(props: Props) {
  return (
    <SessionProvider>
      {props.children}
    </SessionProvider>
  );
}