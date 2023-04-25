"use client";
import { useTheme } from "next-themes";

export default function Loading() {
  const { theme } = useTheme();

  return (
    <div className=" flex flex-col justify-center items-center px-[3rem]  xsm:px-[4rem] py-[3rem] h-full ">
      <div
        className={`${
          theme === "dark" ? "bg-[#171b2c]" : "bg-gray-100"
        } animate-pulse mb-2 rounded-lg p-[3px] w-full h-[3.5rem]  `}
      ></div>
      <div className="bg-gray-100 dark:bg-[#171b2c] animate-pulse mb-2 rounded-lg p-[3px] w-full h-[3.5rem]  "></div>
      <div className="bg-gray-100 dark:bg-[#171b2c] animate-pulse mb-2 rounded-lg p-[3px] w-full h-[3.5rem]  "></div>
    </div>
  );
}
