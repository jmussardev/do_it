import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import getDate from "../../../utilities/date";
import Image from "next/image";
import check from "./../../../public/icons/checkWhite.png";

export default function NavBar({
  setOpen,
  numTasks,
  numTasksDone,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  numTasks: number;
  numTasksDone: number;
}) {
  const { getDay, today } = getDate();
  const tdayNum = getDay(today());
  return (
    <div className=" w-full font-bold text-lg text-center bg-white border-b-2 border-black sm:border-none  -- sm:static sm:text-left ">
      <ul className=" sm:border-black border-t-[3px] mb-10 pt-4 text-center sm:text-left">
        <li>
          <Link href={"/"}>
            <div className="inline-block">
              <div className="  flex  w-full ">
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Today
                </button>
                <div className="ml-2 flex items-center  w-full">
                  <div className=" rounded-md flex justify-center items-center h-5 w-5 bg-black text-white text-xs">
                    {numTasks}
                  </div>
                  <div className="ml-1 pl-1 pr-1  rounded-md flex justify-center items-center h-5  bg-black text-white text-xs">
                    <div>{numTasksDone}</div>
                    <div className="ml-1 h-3 w-3 flex justify-center items-center">
                      <Image src={check} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
        <li>
          <Link href={`/my-week/${tdayNum}`}>
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
      <div className="pt-4 mb-5 border-black border-t-[3px]   ">
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
