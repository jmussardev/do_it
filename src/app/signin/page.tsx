import Image from "next/image";
import { Inter } from "next/font/google";
import { Open_Sans } from "next/font/google";

export default function Signin() {
  return (
    <div className="relative  h-full w-full">
      <div className="absolute top-[50%] left-[25%] lds-ellipsis ">
        <div className="w-10 h-10"></div>
        <div className="w-10 h-10"></div>
        <div className="w-10 h-10"></div>
        <div className="w-10 h-10"></div>
      </div>
    </div>
  );
}
