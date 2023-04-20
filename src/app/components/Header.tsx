"use client";

import { useState } from "react";
import NavBar from "./Navbar";
import cross from "./../../../public/icons/cross.png";
import Image from "next/image";
import menu from "./../../../public/icons/menu.png";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Header({
  numTasks,
  numTasksDone,
}: {
  numTasks: number | undefined;
  numTasksDone: number | undefined;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
          exit={{ y: -1000 }}
          className="z-10 sticky top-0   w-full h-[6rem] bg-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)] rounded-e-md <##> sm:static sm:h-full sm:w-1/4 sm:p-6 sm:mt-2 "
        >
          <div className="absolute w-full z-50 flex justify-between pb-3 items-center bg-white   -- sm:static sm:w-full">
            <Link href={"/"}>
              <div className=" ml-2 mt-2 text-right w-[70px]  bg-black text-white font-bold text-3xl">
                <span className="block">DO</span>
                <span className="block pr-[3px] ">.IT</span>
              </div>
            </Link>

            <div className="h-14 w-14 mr-2 mt-2 rounded-full  hidden sm:block  sm:ml-16"></div>
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
            <NavBar
              numTasks={numTasks}
              numTasksDone={numTasksDone}
              setOpen={setOpen}
            />
          </div>
          <div className="hidden  sm:block">
            <NavBar
              numTasks={numTasks}
              numTasksDone={numTasksDone}
              setOpen={setOpen}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// -translate-x-[254px]
