import Image from "next/image";
import pencil from "./../../../public/icons/pencil.png";
import check from "./../../../public/icons/check.png";
import chrono from "./../../../public/icons/chrono.png";
import pause from "./../../../public/icons/pause.png";
import play from "./../../../public/icons/play.png";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

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
  isActive,
  setIsActive,
  taskRef,
  task_id,
}: {
  setEdit: Dispatch<SetStateAction<boolean>>;
  setIsChronoOpen: Dispatch<SetStateAction<boolean>>;
  setTimerState: Dispatch<SetStateAction<State>>;
  start: boolean | null;
  end: boolean | null;
  value: number;
  inputs: Inputs;
  isPaused: boolean;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  taskRef: MutableRefObject<boolean>;
  task_id: number | null;
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
        className=" pb-2 h-5 w-5 hover:scale-125"
        onClick={() => {
          setIsChronoOpen(true);
        }}
      >
        <Image src={chrono} alt="" />
      </button>

      {start === false && task_id !== inputs.id && (
        <button
          disabled={inputs.timer === 0 ? true : false}
          className=" h-5 w-5 hover:scale-125"
          onClick={() => {
            console.log("overlay play");
            // setIsActive(true);
            // taskRef.current = true;
            console.log("laaaa");
            setTimerState({
              task_id: inputs.id,
              value: inputs.timer,
              start: true,
              end: false,
              isPaused: false,
            });
          }}
        >
          <Image src={play} alt="" />
        </button>
      )}

      {start === false && isPaused === true && task_id === inputs.id && (
        <button
          disabled={inputs.timer === 0 ? true : false}
          className=" h-5 w-5 hover:scale-125"
          onClick={() => {
            console.log("overlay play");
            // setIsActive(true);
            // taskRef.current = true;

            console.log(inputs.timer);

            setTimerState({
              task_id: inputs.id,
              value: value,
              start: true,
              end: false,
              isPaused: false,
            });
          }}
        >
          <Image src={play} alt="" />
        </button>
      )}

      {start && task_id === inputs.id && (
        <button
          className="pt-1 h-8 w-8 hover:scale-125"
          onClick={() => {
            console.log("overlay pause");
            // taskRef.current = false;

            setTimerState({
              task_id: inputs.id,
              value: value,
              start: false,
              end: false,
              isPaused: true,
            });
          }}
        >
          <Image src={pause} alt="" />
        </button>
      )}

      {/* //btns// */}
    </div>
  );
}
