import Image from "next/image";
import pencil from "./../../../public/icons/pencil.png";
import done from "./../../../public/icons/done.png";
import chrono from "./../../../public/icons/chrono.png";
import stop from "./../../../public/icons/stop.png";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import PlayBtn from "./PlayBtn";
import { useRouter } from "next/navigation";

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
  overlayRef,
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
  isOverlayOpen: boolean;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
  overlayRef: number;
  setTaskDone: () => void;
}) {
  const router = useRouter();
  return (
    <div
      className={`absolute z-30 bg-gray-100 bg-opacity-90 flex justify-evenly  items-center rounded-lg w-full h-full top-0 left-0 `}
    >
      {/* //btns// */}
      <button
        className="z-10 origin-center h-6 w-6 hover:scale-125"
        onClick={() => {
          setTaskDone();
          // setIsOverlayOpen(false);
          // router.refresh();
        }}
        disabled={isOverlayOpen ? false : true}
      >
        <Image src={done} alt="" />
      </button>
      {inputs.iscompleted ? (
        ""
      ) : (
        <>
          {" "}
          <button
            className="z-10 origin-center h-6 w-6 hover:scale-125"
            onClick={() => {
              setEdit(true);
              setTimeout(() => {
                setEdit(false);
              }, 15000);
            }}
            disabled={isOverlayOpen ? false : true}
          >
            <Image src={pencil} alt="" />
          </button>
          {task_id === inputs.id ? (
            <button
              className="z-10  origin-center h-5 w-5 hover:scale-125"
              onClick={() => {
                setTimerState({
                  task_id: null,
                  value: value,
                  start: false,
                  end: false,
                  isPaused: false,
                });
                setIsOverlayOpen(false);
              }}
              disabled={isOverlayOpen ? false : true}
            >
              <Image src={stop} alt="" />
            </button>
          ) : (
            <button
              className="z-10 origin-center   h-5 w-5 hover:scale-125"
              onClick={() => {
                setIsChronoOpen(true);
              }}
              disabled={isOverlayOpen ? false : true}
            >
              <Image src={chrono} alt="" />
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
