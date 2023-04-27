"use client";
import { useTheme } from "next-themes";

export default function DotLoading() {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="  h-full w-full flex justify-center mt-24">
      <div
        className={
          currentTheme === "dark" ? "lds-ellipsis--dark" : "lds-ellipsis"
        }
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
