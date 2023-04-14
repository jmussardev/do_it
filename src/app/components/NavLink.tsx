"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import getDate from "../../../utilities/date";

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
        isOld text-black 
         flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 
        ${
          isActive && isOldTask() === false
            ? "-translate-y-[5px] bg-black "
            : ""
        }  
        ${isOldTask() && isActive ? "-translate-y-[5px] text-black " : ""} 
         border-l-2 border-b-2 border-r-2 border-black rounded-b-md  font-bold ## 
        ${
          isActive
            ? ""
            : "bg-white hover:-translate-y-[5px]  hover:bg-black hover:text-white"
        } 
         ## sm:w-[5rem] sm:h-[6rem]  `}
        >
          {children}
        </div>
      ) : (
        <div
          className={` 
        ${isOldTask() ? " isOld text-black " : ""} 
         flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 
        ${
          isActive && isOldTask() === false
            ? "-translate-y-[5px] bg-black text-white"
            : ""
        }  
        ${isOldTask() && isActive ? "-translate-y-[5px] text-black " : ""} 
         border-l-2 border-b-2 border-r-2 border-black rounded-b-md  font-bold ## 
        ${
          isActive
            ? ""
            : "bg-white hover:-translate-y-[5px]  hover:bg-black hover:text-white"
        } 
         ## sm:w-[5rem] sm:h-[6rem]  `}
        >
          {children}
        </div>
      )}
    </Link>
  );
}
