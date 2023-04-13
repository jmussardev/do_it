import { Dispatch, SetStateAction } from "react";
import pause from "./../../../public/icons/pause.png";
import play from "./../../../public/icons/play.png";
import Image from "next/image";

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

export default function PlayBtn({
  start,
  task_id,
  inputs,
  setTimerState,
  isPaused,
  value,
}: {
  setTimerState: Dispatch<SetStateAction<State>>;
  start: boolean | null;
  value: number;
  inputs: Inputs;
  isPaused: boolean;
  task_id: number | null;
}) {
  return (
    <>
      {start === false && task_id !== inputs.id && (
        <button
          disabled={inputs.timer === 0 ? true : false}
          className=" h-5 w-5 hover:scale-125"
          onClick={() => {
            // console.log("overlay play");
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
            // console.log("overlay pause");
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
    </>
  );
}
