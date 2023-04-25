/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import barrier from "./../../public/icons/barrier.svg";
import barrier_dark from "./../../public/icons/barrier-dark.png";
import { getCookie } from "cookies-next";

export default function NotFound() {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 3000);

  const theme = getCookie("theme");

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full px-9 py-14 ">
        {theme === "dark" ? (
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
