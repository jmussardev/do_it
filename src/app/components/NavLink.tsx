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
  href,
  exact = false,
  children = null,

  ...props
}: NavLinkType) {
  const { getDay, today } = getDate();
  const tDayNum = parseInt(getDay(today()));
  //url => url dans le navigateur //
  //href=> url du lien cliqué
  let url = usePathname();
  const dayPage = parseInt(href.split("/")[href.split("/").length - 1]);

  //pour etre consider comme is old le lien le numero du jour de la semaine contenu dan href doit etre < au # du jour d'aujourdhui
  const isOldTask = () => {
    if (dayPage < tDayNum) {
      return true;
    } else return false;
  };
  console.log("tDayNum>>> " + tDayNum);
  console.log("dayPage>>> " + dayPage);
  console.log("href>>> " + href);
  console.log("href>>> " + href);

  //pour etre active le url doit correspondre au href
  const isActive = exact ? url === href : false;
  console.log(">>>>>>>>>>>" + isOldTask());
  console.log(">>>>>>>>>>>" + isActive);

  //   bg-black text-white
  return (
    //on veut  dans href passer le lien a cliqué
    <Link href={href}>
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
    </Link>
  );
}
