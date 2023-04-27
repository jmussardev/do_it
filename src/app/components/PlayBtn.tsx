import { Dispatch, SetStateAction } from "react";
import pause from "./../../../public/icons/pause.png";
import play from "./../../../public/icons/play.png";
import pause_dark from "./../../../public/icons/pause-dark.png";
import play_dark from "./../../../public/icons/play-dark.png";
import Image from "next/image";
import { useTheme } from "next-themes";

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
  isOverlayOpen,
  setIsOverlayOpen,
}: {
  setTimerState: Dispatch<SetStateAction<State>>;
  start: boolean | null;
  value: number;
  inputs: Inputs;
  isPaused: boolean;
  task_id: number | null;
  isOverlayOpen: boolean;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      {start === false && task_id !== inputs.id && (
        <button
          disabled={
            inputs.timer === 0 || isOverlayOpen === false ? true : false
          }
          className="disabled:opacity-30 origin-center h-5 w-5 hover:scale-125"
          onMouseDown={() => {
            setTimerState({
              task_id: inputs.id,
              value: inputs.timer,
              start: true,
              end: false,
              isPaused: false,
            });
            // setIsOverlayOpen(false);
          }}
        >
          {currentTheme === "dark" ? (
            <Image src={play_dark} alt="" />
          ) : (
            <Image src={play} alt="" />
          )}
        </button>
      )}

      {start === false && isPaused === true && task_id === inputs.id && (
        <button
          disabled={
            inputs.timer === 0 || isOverlayOpen === false ? true : false
          }
          className="disabled:opacity-30 z-10 origin-center h-5 w-5 hover:scale-125"
          onMouseDown={() => {
            setTimerState({
              task_id: inputs.id,
              value: value,
              start: true,
              end: false,
              isPaused: false,
            });
            // setIsOverlayOpen(false);
          }}
        >
          {currentTheme === "dark" ? (
            <Image src={play_dark} alt="" />
          ) : (
            <Image src={play} alt="" />
          )}
        </button>
      )}

      {start && task_id === inputs.id && (
        <button
          className="z-10 origin-center  h-5 w-5 hover:scale-125"
          onMouseDown={() => {
            setTimerState({
              task_id: inputs.id,
              value: value,
              start: false,
              end: false,
              isPaused: true,
            });
            // setIsOverlayOpen(false);
          }}
          disabled={isOverlayOpen ? false : true}
        >
          {currentTheme === "dark" ? (
            <Image src={pause_dark} alt="" />
          ) : (
            <Image src={pause} alt="" />
          )}
        </button>
      )}
    </>
  );
}
