"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import getDate from "../../../utilities/date";
import { useTheme } from "next-themes";

export interface NavLinkType {
  href: string;
  exact: boolean;
  children: React.ReactNode;
  isArchived: boolean;
}

export function NavLink({
  href,
  exact = false,
  children = null,
  isArchived = false,

  ...props
}: NavLinkType) {
  const { theme } = useTheme();
  const { getDay, today } = getDate();
  const tDayNum = parseInt(getDay(today()));
  const dayPage = parseInt(href.split("/")[href.split("/").length - 1]);

  const isOldTask = () => {
    if (dayPage < tDayNum) {
      return true;
    } else return false;
  };

  let url = usePathname();

  const isActive = exact ? url === href : false;

  return (
    <Link href={href}>
      {isArchived ? (
        <div
          className={` 
       ${
         theme === "dark"
           ? " isOld-dark text-black text-opacity-50  "
           : "isOld text-black "
       } text-black 
         flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 
        ${isActive ? "-translate-y-[5px] bg-black dark:bg-[#171b2c]" : ""}  
        ${
          isActive
            ? "-translate-y-[5px] text-black dark:text-[#E18B15] dark:bg-[#171b2c] "
            : ""
        } 
         border-l-2 border-b-2 border-r-2 drop-shadow-md rounded-b-md  font-bold ## dark:border-[#E18B15]
        ${
          isActive
            ? ""
            : "bg-white hover:-translate-y-[5px]  hover:bg-black hover:text-white  dark:hover:text-[#E18B15] dark:hover:bg-[#171b2c] dark:bg-[#3A405F]"
        } 
         ## sm:w-[5rem] sm:h-[6rem]  `}
        >
          {children}
        </div>
      ) : (
        <div
          className={` 
        ${
          isOldTask()
            ? theme === "dark"
              ? " isOld-dark text-black text-opacity-50  "
              : "isOld text-black "
            : ""
        } 
         flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 
        ${
          isActive && isOldTask() === false
            ? "-translate-y-[5px] bg-black text-white dark:text-[#E18B15] dark:bg-[#171b2c]"
            : ""
        }  
        ${
          isOldTask() && isActive
            ? "-translate-y-[5px] text-black dark:bg-[#171b2c] dark:text-[#E18B15] "
            : ""
        } 
         border-l-2 border-b-2 border-r-2 drop-shadow-md rounded-b-md  font-bold ## dark:border-[#E18B15] 
        ${
          isActive
            ? ""
            : "bg-white hover:-translate-y-[5px]  hover:bg-black hover:text-white dark:text-[#0a0c16] dark:hover:text-[#E18B15] dark:hover:bg-[#171b2c] dark:bg-[#3A405F]"
        } 
         ## sm:w-[5rem] sm:h-[6rem]  `}
        >
          {children}
        </div>
      )}
    </Link>
  );
}
