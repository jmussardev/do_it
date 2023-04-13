"use client";

import { useContext } from "react";
import { ChronoContext } from "../context/ChronoContext";
import Timer from "./Timer";

const dayjs = require("dayjs");

export default function TodayHeader() {
  const { start, isPaused } = useContext(ChronoContext);
  const today = dayjs().format("dddd-YYYY-MM-DD");
  const dateSpt = today.split("-");
  const dateNum = `${dateSpt[2]}/${dateSpt[3]}`;
  console.log(today);
  return (
    <div className="w-full  h-fit  pb-5 flex justify-center border-black border-b-2">
      <div className="w-[8rem] h-[5rem] rounded-b-md bg-black -- text-white font-bold flex flex-col justify-center items-center">
        {start || isPaused ? (
          <Timer />
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
