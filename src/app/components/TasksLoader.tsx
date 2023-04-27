"use client";
import { useTheme } from "next-themes";

export default function TasksLoader() {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div className=" flex flex-col px-[1rem]  xsm:px-[4rem] py-[3rem] h-full ">
      <div
        className={`${
          currentTheme === "dark" ? "bg-[#171b2c]" : "bg-gray-100"
        } animate-pulse mb-2 rounded-lg p-[3px] w-full h-[6.25rem] `}
      ></div>
      <div
        className={`${
          currentTheme === "dark" ? "bg-[#171b2c]" : "bg-gray-100"
        } animate-pulse mb-2 rounded-lg p-[3px] w-full h-[6.25rem] `}
      ></div>
      <div
        className={`${
          currentTheme === "dark" ? "bg-[#171b2c]" : "bg-gray-100"
        } animate-pulse mb-2 rounded-lg p-[3px] w-full h-[6.25rem] `}
      ></div>
      <div
        className={`${
          currentTheme === "dark" ? "bg-[#171b2c]" : "bg-gray-100"
        } animate-pulse mb-2 rounded-lg p-[3px] w-full h-[6.25rem] `}
      ></div>
    </div>
  );
}
