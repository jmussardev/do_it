"use client";
import { useTheme } from "next-themes";
import React from "react";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <main
      className={`${
        theme === "dark" ? "bgpattern-dark" : "bgpattern"
      }  h-screen --dark-- dark:text-[#E18B15] `}
    >
      {children}
    </main>
  );
}
