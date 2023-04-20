"use client";

import { useContext } from "react";
import { ChronoContext } from "../context/ChronoContext";
import Timer from "./Timer";
import getDate from "../../../utilities/date";

export default function TodayHeader() {
  const { start, isPaused } = useContext(ChronoContext);
  const { today, day, dateNum } = getDate();

  return (
    <div className="w-full  h-fit  pb-5 flex justify-center border-black border-b-2">
      <div className="  w-[8rem] h-[5rem] rounded-b-md bg-black -- text-white font-bold flex flex-col justify-center items-center">
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
