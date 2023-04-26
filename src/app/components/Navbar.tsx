/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";
import getDate from "../../../utilities/date";
import Image from "next/image";
import check from "./../../../public/icons/checkWhite.png";
import check_dark from "./../../../public/icons/tag-dark.png";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import axios from "axios";
// import useSWR, { mutate } from "swr";
// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function NavBar({
  setOpen,
  payLoad,
  numTasks,
  numTasksDone,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  payLoad?: string;
  numTasksDone?: number;
  numTasks?: number;
}) {
  const { systemTheme, theme, setTheme } = useTheme();

  const { getDay, today } = getDate();
  const tdayNum = getDay(today());
  const { signout } = useAuth();
  const router = useRouter();
  // const { data, mutate } = useSWR(`/api/task/${payLoad}/count`, fetcher);

  // mutate(data);

  return (
    <div className=" w-full font-bold text-lg text-center bg-white border-b-2 border-black sm:border-none  -- sm:static sm:text-left --dark-- dark:bg-[#3A405F]">
      <ul className=" sm:border-black border-t-[3px] mb-10 pt-4 text-center sm:text-left --dark-- dark:border-[#E18B15] sm:dark:border-[#E18B15]">
        <li>
          <Link href={"/user/today"}>
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
                  <div className=" rounded-md flex justify-center items-center h-5 w-5 bg-black text-white text-xs --dark-- dark:bg-transparent dark:border-[1px] dark:border-[#E18B15] dark:text-[#E18B15]">
                    {numTasks}
                  </div>
                  <div className="ml-1 pl-1 pr-1  rounded-md flex justify-center items-center h-5  bg-black text-white text-xs --dark-- dark:bg-transparent dark:border-[1px] dark:border-[#E18B15] dark:text-[#E18B15]">
                    <div>{numTasksDone}</div>
                    <div className="ml-1 h-3 w-3 flex justify-center items-center">
                      {theme === "dark" ? (
                        <Image src={check_dark} alt="" className="w-56 " />
                      ) : (
                        <Image src={check} alt="" className="w-56 " />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
        <li>
          <Link href={`/user/my-week/${tdayNum}`}>
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
          <Link href={"/user/archived"}>
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
      <div className="pt-4 mb-5 border-black border-t-[3px]  --dark-- dark:border-[#E18B15]   ">
        <ul>
          <li>
            <button
              onClick={() => {
                theme === "dark" ? setTheme("light") : setTheme("dark");
                router.refresh();
              }}
            >
              {theme === "dark" ? "Light mode" : "Dark mode "}
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                signout(router);
                // router.push("/");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
