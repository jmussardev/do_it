/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import barrier from "./../../../../../../public/icons/barrier.svg";
export default function NotFound() {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 3000);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full px-9 py-14 ">
        <div className="w-28 h-28 mb-4">
          <Image src={barrier} alt="error" className="w-56 mb-8" />
        </div>
        <div className="block text-center text-xl font-bold">
          Error Code: 404
        </div>
      </div>
    </>
  );
}
