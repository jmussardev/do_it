"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import getDate from "../../../utilities/date";

export { NavLink };

export interface NavLinkType {
  href: string;
  exact: boolean;
  children: React.ReactNode;
}

function NavLink({
  href = "",
  exact = false,
  children = null,

  ...props
}: NavLinkType) {
  const { getDay, today } = getDate();
  const tDayNum = getDay(today());
  const url = usePathname();
  const dayPage = href.split("/")[href.split("/").length - 1];
  const isOldTask = () => {
    if (dayPage < tDayNum) return true;
    else return false;
  };

  const isActive = exact ? url === href : false;
  console.log(">>>>>>>>>>>" + isOldTask());

  //   bg-black text-white
  return (
    <Link href={href}>
      <div
        className={` ${
          isOldTask() ? "bg-gray-300" : 0
        } flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 border-l-2 border-b-2 border-r-2 border-black rounded-b-md  font-bold ## ${
          isActive
            ? ""
            : "bg-white hover:-translate-y-1  hover:bg-black hover:text-white"
        }  ## sm:w-[5rem] sm:h-[6rem] "     ${
          isActive ? "-translate-y-1 bg-black text-white" : ""
        }`}
      >
        {children}
      </div>
    </Link>
  );
}
