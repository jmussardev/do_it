/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
// import errorMascot from "./../../public/icons/error.png";

export default function NotFound() {
  return (
    <>
      {/* <Image src={errorMascot} alt="error" className="w-56 mb-8" /> */}
      <div className="flex justify-center items-center h-full w-full px-9 py-14 ">
        <div className="block text-center text-xl font-bold">
          Error Code: 404
        </div>
      </div>
    </>
  );
}
