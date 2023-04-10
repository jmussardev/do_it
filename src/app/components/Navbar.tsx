import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function NavBar({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className=" w-full font-bold text-lg text-center bg-white border-b-2 border-black  -- sm:static sm:text-left ">
      <ul className=" sm:border-black border-t-[3px] mb-10 pt-4">
        <li>
          <Link href={"/"}>
            {" "}
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              Today
            </button>{" "}
          </Link>
        </li>
        <li>
          <Link href={"/my-week"}>
            {" "}
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              My week
            </button>
          </Link>
        </li>
        <li>
          <Link href={"/archived"}>
            {" "}
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              Archived
            </button>
          </Link>
        </li>
      </ul>
      <div className="pt-4 mb-5 border-black border-t-[3px]  ">
        <ul>
          <li>
            <button>Dark mode</button>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
