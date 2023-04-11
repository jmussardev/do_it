import Image from "next/image";
import pencil from "./../../../public/icons/pencil.png";
import check from "./../../../public/icons/check.png";
import chrono from "./../../../public/icons/chrono.png";
import play from "./../../../public/icons/play.png";
import { Dispatch, SetStateAction } from "react";

interface State {
  value: number;
  start: boolean;
  end: boolean | null;
  current: string;
}
interface Inputs {
  description: string;
  priority: string;
  timer: number;
  iscompleted: boolean;
}
export default function OverlayMenu({
  inputs,
  setEdit,
  setIsChronoOpen,
  setTimerState,
  start,
  end,
}: {
  setEdit: Dispatch<SetStateAction<boolean>>;
  setIsChronoOpen: Dispatch<SetStateAction<boolean>>;
  setTimerState: Dispatch<SetStateAction<State>>;
  start: boolean | null;
  end: boolean | null;
  inputs: Inputs;
}) {
  return (
    <div className="absolute  flex justify-evenly items-center rounded-lg w-full h-full top-0 left-0 bg-gray-100 bg-opacity-60">
      {/* //btns// */}
      <button className=" h-7 w-7 hover:scale-125">
        <Image src={check} alt="" />
      </button>
      <button
        className=" h-6 w-6 hover:scale-125"
        onClick={() => {
          setEdit(true);
        }}
      >
        <Image src={pencil} alt="" />
      </button>
      <button
        className=" h-6 w-6 hover:scale-125"
        onClick={() => {
          setIsChronoOpen(true);
        }}
      >
        <Image src={chrono} alt="" />
      </button>
      <button
        className=" h-5 w-5 hover:scale-125"
        onClick={() => {
          console.log("overlay play");
          setTimerState({
            value: inputs.timer,
            start: true,
            end: false,
            current: "",
          });
        }}
      >
        <Image src={play} alt="" />
      </button>
      {/* //btns// */}
    </div>
  );
}
