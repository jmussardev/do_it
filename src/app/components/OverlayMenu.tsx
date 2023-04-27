import Image from "next/image";
import pencil from "./../../../public/icons/pencil.png";
import done from "./../../../public/icons/done.png";
import chrono from "./../../../public/icons/chrono.png";
import stop from "./../../../public/icons/stop.png";
import pencil_dark from "./../../../public/icons/pencil-dark.png";
import done_dark from "./../../../public/icons/done-dark.png";
import chrono_dark from "./../../../public/icons/chrono-dark.png";
import stop_dark from "./../../../public/icons/stop-dark.png";
import { Dispatch, SetStateAction } from "react";
import PlayBtn from "./PlayBtn";
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
  setTaskDone,
  isOverlayOpen,
  setIsOverlayOpen,
}: {
  setEdit: (
    state: boolean,
    cb?: ((state: boolean) => void) | undefined
  ) => void;
  setIsChronoOpen: Dispatch<SetStateAction<boolean>>;
  setTimerState: Dispatch<SetStateAction<State>>;
  start: boolean | null;
  end: boolean | null;
  value: number;
  inputs: Inputs;
  isPaused: boolean;
  task_id: number | null;
  onWeek: boolean;
  isOverlayOpen: boolean;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
  setTaskDone: () => void;
}) {
  const { theme } = useTheme();
  return (
    <div
      className={`absolute  bg-gray-100 bg-opacity-90 flex justify-evenly  items-center rounded-lg w-full h-full top-0 left-0 --dark--  dark:bg-[#3A405F]  dark:bg-opacity-90`}
    >
      {/* //btns// */}
      <button
        className="z-10 origin-center h-6 w-6 hover:scale-125"
        onMouseDown={() => {
          setTaskDone();
        }}
        disabled={isOverlayOpen ? false : true}
      >
        {theme === "dark" ? (
          <Image src={done_dark} alt="" />
        ) : (
          <Image src={done} alt="" />
        )}
      </button>
      {inputs.iscompleted ? (
        ""
      ) : (
        <>
          <button
            className="z-10 origin-center h-6 w-6 hover:scale-125"
            onMouseDown={() => {
              setEdit(true);
            }}
            disabled={isOverlayOpen ? false : true}
          >
            {theme === "dark" ? (
              <Image src={pencil_dark} alt="" />
            ) : (
              <Image src={pencil} alt="" />
            )}
          </button>
          {task_id === inputs.id ? (
            <button
              className="z-10  origin-center h-5 w-5 hover:scale-125"
              onMouseDown={() => {
                setTimerState({
                  task_id: null,
                  value: value,
                  start: false,
                  end: false,
                  isPaused: false,
                });
                // setIsOverlayOpen(false);
              }}
              disabled={isOverlayOpen ? false : true}
            >
              {theme === "dark" ? (
                <Image src={stop_dark} alt="" />
              ) : (
                <Image src={stop} alt="" />
              )}
            </button>
          ) : (
            <button
              className="z-10 origin-center   h-5 w-5 hover:scale-125"
              onMouseDown={() => {
                setIsChronoOpen(true);
              }}
              disabled={isOverlayOpen ? false : true}
            >
              {theme === "dark" ? (
                <Image src={chrono_dark} alt="" />
              ) : (
                <Image src={chrono} alt="" />
              )}
            </button>
          )}
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
              isOverlayOpen={isOverlayOpen}
              setIsOverlayOpen={setIsOverlayOpen}
            />
          )}
        </>
      )}

      {/* //btns// */}
    </div>
  );
}
