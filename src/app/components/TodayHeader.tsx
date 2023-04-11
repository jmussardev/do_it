"use client";

import { useContext, useEffect, useState } from "react";
import { ChronoContext } from "../context/ChronoContext";
import timer from "../../../utilities/timer";

const dayjs = require("dayjs");

export default function TodayHeader() {
  const { setTimerState, start, value } = useContext(ChronoContext);
  const [displayTime, setDisplayTime] = useState("");
  const { startTimer } = timer(value, setDisplayTime);

  const today = dayjs().format("dddd-YYYY-MM-DD");
  const dateSpt = today.split("-");
  const dateNum = `${dateSpt[2]}/${dateSpt[3]}`;

  console.log(displayTime);
  useEffect(() => {
    if (start) {
      startTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  return (
    <div className="w-full  h-fit  pb-5 flex justify-center border-black border-b-2">
      <div className="w-[8rem] h-[5rem] rounded-b-md bg-black -- text-white font-bold flex flex-col justify-center items-center">
        {start ? (
          <div> {displayTime} </div>
        ) : (
          <>
            <p>{dateSpt[0]}</p>
            <p>{dateNum}</p>
          </>
        )}
      </div>
    </div>
  );
}
