"use client";
import { ThemeProvider, useTheme } from "next-themes";
import React from "react";
import Background from "../components/Background";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Background>{children}</Background>
    </ThemeProvider>
  );
}
