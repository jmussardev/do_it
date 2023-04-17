"use client";

import { useState } from "react";
import NavBar from "./Navbar";
import cross from "./../../../public/icons/cross.png";
import Image from "next/image";
import menu from "./../../../public/icons/menu.png";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="z-10 sticky top-0   w-full h-[6rem] bg-white border-2 border-rose-500  <##> sm:static sm:h-full sm:w-1/4 sm:p-6 ">
        <div className="absolute w-full z-50 flex justify-between pb-3 items-center bg-white border border-yellow-400 -- sm:static sm:w-full">
          <Link href={"/"}>
            <div className=" ml-2 mt-2 text-right w-[70px]  bg-black text-white font-bold text-3xl">
              <span className="block">DO</span>
              <span className="block pr-[3px] ">.IT</span>
            </div>
          </Link>

          <div className="h-14 w-14 mr-2 mt-2 rounded-full bg-purple-400 hidden sm:block  sm:ml-16"></div>
          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div className="h-14 w-14 mr-2 mt-2 rounded-full  sm:hidden">
              {open ? (
                <Image src={cross} alt="" />
              ) : (
                <Image src={menu} alt="" />
              )}
            </div>
          </button>
        </div>
        <div
          className={`block ${
            open ? "translate-y-[6rem]" : "-translate-y-[10rem]"
          } transition-all ease-in-out sm:hidden`}
        >
          <NavBar setOpen={setOpen} />
        </div>
        <div className="hidden  sm:block">
          <NavBar setOpen={setOpen} />
        </div>
      </div>
    </>
  );
}

// -translate-x-[254px]
