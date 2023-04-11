import Image from "next/image";
import check from "./../../../public/icons/check.png";
import cross_rounded from "./../../../public/icons/cross_rounded.png";
import dash from "./../../../public/icons/dash.png";
import { counter, displayCount } from "./../../../utilities/counter";
import { Dispatch, SetStateAction } from "react";
import { PRIORITY } from "@prisma/client";

interface Inputs {
  description: string;
  priority: string;
  timer: number;
  iscompleted: boolean;
}

export default function Chrono({
  inputs,
  setInputs,
  setIsChronoOpen,
}: {
  inputs: Inputs;
  setInputs: Dispatch<SetStateAction<Inputs>>;
  setIsChronoOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="absolute z-10 flex  items-center rounded-lg w-full h-full top-0 left-0 bg-gray-100 bg-opacity-60">
      <div className=" w-1/4 h-full p-4 flex flex-col justify-between items-center ">
        <button
          className="w-6 h-6 hover:scale-125 "
          onClick={() => {
            setInputs({
              ...inputs,
              timer: counter(inputs.timer, "res"),
            });
          }}
        >
          <Image src={cross_rounded} alt="" />
        </button>
        <button
          className="w-4 h-4 hover:scale-125"
          onClick={() => {
            setIsChronoOpen(false);
          }}
        >
          <Image src={check} alt="" />
        </button>
      </div>
      <div className="flex-2 font-bold text-3xl text-center  w-2/4">
        {displayCount(inputs.timer)}
      </div>
      <div className="w-1/4 h-full p-4 flex flex-col items-center justify-between  ">
        <button
          className="rotate-45 w-5 h-5 hover:scale-125"
          onClick={() => {
            setInputs({
              ...inputs,
              timer: counter(inputs.timer, "add"),
            });
          }}
        >
          <Image src={cross_rounded} alt="" />
        </button>
        <button
          className="w-5 h-5 hover:scale-125"
          onClick={() => {
            setInputs({
              ...inputs,
              timer: counter(inputs.timer, "sub"),
            });
          }}
        >
          <Image src={dash} alt="" />
        </button>
      </div>
    </div>
  );
}
