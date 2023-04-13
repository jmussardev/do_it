import Link from "next/link";
import { NavLink } from "./NavLink";

export default function WeekNavBar() {
  return (
    <div className="bg-opacity-0 w-full h-[6rem] overflow-y-hidden  border-b-2 border-black">
      <div className=" justify-evenly -space-x-3 flex  h-full  ## sm:-space-x-1 sm:flex-row sm:w-full sm:justify-evenly">
        <NavLink href="/my-week/1" exact>
          M
        </NavLink>
        <NavLink href="/my-week/2" exact>
          T
        </NavLink>
        <NavLink href="/my-week/3" exact>
          W
        </NavLink>
        <NavLink href="/my-week/4" exact>
          T
        </NavLink>
        <NavLink href="/my-week/5" exact>
          F
        </NavLink>
        <NavLink href="/my-week/6" exact>
          S
        </NavLink>
        <NavLink href="/my-week/7" exact>
          S
        </NavLink>
      </div>
    </div>
  );
}
