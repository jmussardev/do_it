/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import barrier from "./../../../public/icons/barrier.svg";
import barrier_dark from "./../../../public/icons/barrier-dark.png";
import { useTheme } from "next-themes";
export default function NotFoundCp() {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 3000);
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full px-9 py-14 ">
        {currentTheme === "dark" ? (
          <Image src={barrier_dark} alt="error" className="w-56 mb-8" />
        ) : (
          <Image src={barrier} alt="error" className="w-56 mb-8" />
        )}

        <div className="block text-center text-xl font-bold">
          Error Code: 404
        </div>
      </div>
    </>
  );
}
