"use client";

import { useState } from "react";
import NavBar from "./Navbar";
import cross from "./../../../public/icons/cross.png";
import cross_dark from "./../../../public/icons/sharpcross-dark.png";
import Image from "next/image";
import menu from "./../../../public/icons/menu.png";
import menu_dark from "./../../../public/icons/menu-dark.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import axios from "axios";

export default function Header({
  payload,
  numTasks,
  numTasksDone,
}: {
  payload?: string;
  numTasksDone?: number;
  numTasks?: number;
}) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const url = usePathname();

  return (
    <>
      {url !== "/" && (
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="z-10 sticky top-0   w-full h-[6rem] bg-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)] rounded-e-md <##> sm:static sm:h-full sm:w-1/4 sm:p-6 sm:mt-2 --dark-- dark:bg-[#3A405F] "
        >
          <div className="absolute w-full z-50 flex justify-between pb-3 items-center bg-white -- sm:static sm:w-full --dark-- dark:bg-[#3A405F]">
            <Link href={"/user/today"}>
              <div className=" ml-2 mt-2 text-right w-[70px]  bg-black text-white font-bold text-3xl --dark-- dark:bg-transparent dark:text-[#E18B15] dark:border-2 dark:border-[#E18B15]">
                <span className="block">DO</span>
                <span className="block pr-[3px] ">.IT</span>
              </div>
            </Link>

            <div className="h-14 w-14 mr-2 mt-2 rounded-full  hidden sm:block  sm:ml-16 --dark-- dark:bg-[#3A405F] "></div>
            <button
              onClick={() => {
                setOpen(!open);
              }}
            >
              <div className="h-14 w-14 mr-2 mt-2 rounded-full  sm:hidden">
                {open ? (
                  theme === "dark" ? (
                    <div className="  flex justify-center items-center p-2">
                      <Image src={cross_dark} alt="" className="w-fit  mb-8" />
                    </div>
                  ) : (
                    <div className="">
                      <Image src={cross} alt="" className=" mb-8" />
                    </div>
                  )
                ) : theme === "dark" ? (
                  <Image src={menu_dark} alt="" className="w-56 mb-8" />
                ) : (
                  <Image src={menu} alt="" className="w-56 mb-8" />
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
              payLoad={payload}
              setOpen={setOpen}
              numTasks={numTasks}
              numTasksDone={numTasksDone}
            />
          </div>
          <div className="hidden  sm:block">
            <NavBar
              payLoad={payload}
              setOpen={setOpen}
              numTasks={numTasks}
              numTasksDone={numTasksDone}
            />
          </div>
        </motion.div>
      )}
    </>
  );
}

// -translate-x-[254px]
