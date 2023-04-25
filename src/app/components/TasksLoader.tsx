"use client";
import { useTheme } from "next-themes";

export default function TasksLoader() {
  const { theme } = useTheme();

  return (
    <div className=" flex flex-col px-[1rem]  xsm:px-[4rem] py-[3rem] h-full ">
      <div
        className={`${
          theme === "dark" ? "bg-[#171b2c]" : "bg-gray-100"
        } animate-pulse mb-2 rounded-lg p-[3px] w-full h-[6.25rem] `}
      ></div>
      <div
        className={`${
          theme === "dark" ? "bg-[#171b2c]" : "bg-gray-100"
        } animate-pulse mb-2 rounded-lg p-[3px] w-full h-[6.25rem] `}
      ></div>
      <div
        className={`${
          theme === "dark" ? "bg-[#171b2c]" : "bg-gray-100"
        } animate-pulse mb-2 rounded-lg p-[3px] w-full h-[6.25rem] `}
      ></div>
      <div
        className={`${
          theme === "dark" ? "bg-[#171b2c]" : "bg-gray-100"
        } animate-pulse mb-2 rounded-lg p-[3px] w-full h-[6.25rem] `}
      ></div>
    </div>
  );
}
