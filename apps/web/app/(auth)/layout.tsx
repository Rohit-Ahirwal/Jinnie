import Header2 from "@/components/Header2";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header2 />
      {children}
    </>
  );
}
