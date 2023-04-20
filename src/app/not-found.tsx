/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
// import errorMascot from "./../../public/icons/error.png";

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
      {/* <Image src={errorMascot} alt="error" className="w-56 mb-8" /> */}
      <div className="bg-white px-9 py-14 shadow rounded">
        <p className="mt-6 text-sm font-light">Error Code: 404</p>
      </div>
    </div>
  );
}
