import Image from "next/image";
import pencil from "./../../../public/icons/pencil.png";
import check from "./../../../public/icons/check.png";
import chrono from "./../../../public/icons/chrono.png";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import PlayBtn from "./PlayBtn";

interface State {
  task_id: number | null;
  value: number;
  start: boolean;
  end: boolean | null;
  isPaused: boolean;
}
interface Inputs {
  id: number;
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
  value,
  isPaused,
  task_id,
  onWeek,
}: {
  setEdit: Dispatch<SetStateAction<boolean>>;
  setIsChronoOpen: Dispatch<SetStateAction<boolean>>;
  setTimerState: Dispatch<SetStateAction<State>>;
  start: boolean | null;
  end: boolean | null;
  value: number;
  inputs: Inputs;
  isPaused: boolean;
  task_id: number | null;
  onWeek: boolean;
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
          setTimeout(() => {
            setEdit(false);
          }, 10000);
        }}
      >
        <Image src={pencil} alt="" />
      </button>
      <button
        className=" pb-2 h-5 w-5 hover:scale-125"
        onClick={() => {
          setIsChronoOpen(true);
        }}
      >
        <Image src={chrono} alt="" />
      </button>
      {onWeek ? (
        ""
      ) : (
        <PlayBtn
          start={start}
          task_id={task_id}
          inputs={inputs}
          setTimerState={setTimerState}
          isPaused={isPaused}
          value={value}
        />
      )}

      {/* //btns// */}
    </div>
  );
}
