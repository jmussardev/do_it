"use client";

import { useContext } from "react";
import { ChronoContext } from "../context/ChronoContext";
import Timer from "./Timer";
import getDate from "../../../utilities/date";

export default function TodayHeader() {
  const { start, isPaused } = useContext(ChronoContext);
  const { today, day, dateNum } = getDate();

  return (
    <div className="w-full  h-fit  pb-5 flex justify-center border-black border-b-2 --dark-- dark:border-[#E18B15] ">
      <div className="  w-[8rem] h-[5rem] rounded-b-md bg-black -- text-white font-bold flex flex-col justify-center items-center --dark-- dark:bg-[#3A405F] dark:text-[#E18B15] dark:border-2 dark:border-[#E18B15] dark:border-t-[#282C45]">
        {start || isPaused === true ? (
          <Timer />
        ) : (
          <>
            <p>{day()}</p>
            <p>{dateNum()}</p>
          </>
        )}
      </div>
    </div>
  );
}
