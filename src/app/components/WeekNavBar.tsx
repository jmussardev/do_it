"use client";

import { NavLink } from "./NavLink";
import { usePathname } from "next/navigation";

export default function WeekNavBar() {
  const url = usePathname();
  const urlSplit = url.split("/");
  const isArchived = urlSplit[2] === "archived" ? true : false;
  console.log(urlSplit);
  console.log(isArchived);
  const archivedWeek = `${urlSplit[2]}/${urlSplit[3]}`;

  return (
    <div className="bg-opacity-0 w-full h-[6rem] overflow-y-hidden  border-b-2 border-black dark:border-[#E18B15]">
      <div className=" justify-evenly -space-x-3 flex  h-full  ## sm:-space-x-1 sm:flex-row sm:w-full sm:justify-evenly">
        <NavLink
          href={`/user/${isArchived ? archivedWeek : "my-week"}/1`}
          exact
          isArchived={isArchived}
        >
          M
        </NavLink>
        <NavLink
          href={`/user/${isArchived ? archivedWeek : "my-week"}/2`}
          exact
          isArchived={isArchived}
        >
          T
        </NavLink>
        <NavLink
          href={`/user/${isArchived ? archivedWeek : "my-week"}/3`}
          exact
          isArchived={isArchived}
        >
          W
        </NavLink>
        <NavLink
          href={`/user/${isArchived ? archivedWeek : "my-week"}/4`}
          exact
          isArchived={isArchived}
        >
          T
        </NavLink>
        <NavLink
          href={`/user/${isArchived ? archivedWeek : "my-week"}/5`}
          exact
          isArchived={isArchived}
        >
          F
        </NavLink>
        <NavLink
          href={`/user/${isArchived ? archivedWeek : "my-week"}/6`}
          exact
          isArchived={isArchived}
        >
          S
        </NavLink>
        <NavLink
          href={`/user/${isArchived ? archivedWeek : "my-week"}/7`}
          exact
          isArchived={isArchived}
        >
          S
        </NavLink>
      </div>
    </div>
  );
}
