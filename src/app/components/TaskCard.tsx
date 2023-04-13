"use client";
import {
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import p1 from "./../../../public/icons/p1.png";
//TYPES
import { TaskType } from "../page";
import { PRIORITY } from "@prisma/client";
//COMPONENTS
import Image, { StaticImageData } from "next/image";
import Chrono from "./Chrono";
import OverlayMenu from "./OverlayMenu";
import OptionPriority from "./OptionPriority";
import { ChronoContext } from "../context/ChronoContext";
import getDate from "../../../utilities/date";

interface TaskProps {
  task: TaskType;
  date: string;
  onWeek?: boolean;
}

export default function TaskCard({ task, date, onWeek }: TaskProps) {
  const [inputs, setInputs] = useState({
    id: 0,
    description: "",
    priority: "",
    timer: 0,
    iscompleted: false,
  });
  const [priorityIcon, setPriorityIcon] = useState<StaticImageData>(p1);
  const [isChronoOpen, setIsChronoOpen] = useState(false);
  const { setTimerState, start, end, value, isPaused, task_id } =
    useContext(ChronoContext);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [edit, setEdit] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const taskRef = useRef(false);
  const { taskDay, compareDate } = getDate();
  const taskDate = taskDay(date);
  const isOldTask = () => {
    console.log(">>>>>>" + taskDate + "<<<<<<");
    console.log(">>>>>>" + compareDate(taskDate) + "<<<<<<");
    if (compareDate(taskDate) < 0) {
      console.log(">>>>>>" + true + "<<<<<<");

      return true;
    } else {
      return false;
    }
  };

  const setCurrentTask = () => {
    setInputs({
      id: task.id,
      description: task.description,
      priority: task.priority,
      timer: task.timer,
      iscompleted: task.iscompleted,
    });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" || event.key === "Enter") {
      setEdit(false);
    }
  };

  useEffect(() => {
    if (start === false || end) {
      setIsActive(false);
      // taskRef.current = false;
    }
  }, [start, end, setIsActive]);

  useEffect(() => {
    setCurrentTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`relative flex p-2 w-full h-[6rem] mb-2 ${
        inputs.id === task_id ? "border-dashed" : ""
      } border-2 border-black rounded-lg bg-white`}
      onKeyDown={(e) => {
        handleKeyPress(e);
      }}
    >
      {/* //overlay// */}
      {isOldTask() ? (
        ""
      ) : (
        <>
          <div
            className="opacity-0 hover:opacity-100 transition-all ease-in "
            hidden={edit ? true : false}
          >
            {isChronoOpen ? (
              <Chrono
                inputs={inputs}
                setInputs={setInputs}
                setIsChronoOpen={setIsChronoOpen}
              />
            ) : (
              <OverlayMenu
                inputs={inputs}
                setEdit={setEdit}
                setIsChronoOpen={setIsChronoOpen}
                task_id={task_id}
                start={start}
                end={end}
                setTimerState={setTimerState}
                isPaused={isPaused}
                value={value}
                onWeek={onWeek ? true : false}
              />
            )}
          </div>
        </>
      )}

      {/* //overlay// */}
      {/* //description// */}
      <div className="flex items-center w-4/5 p-2 ">
        <input
          className="w-full h-full border-transparent focus:outline-none "
          readOnly={edit ? false : true}
          type="text"
          value={inputs.description}
          placeholder="Describe your task.."
          name="description"
          onChange={(e) => {
            handleChangeInput(e);
          }}
          onBlur={() => {
            setEdit(false);
          }}
        />
      </div>
      {/* //description// */}
      {/* //options// */}

      <OptionPriority
        inputs={inputs}
        setInputs={setInputs}
        priorityIcon={priorityIcon}
        setPriorityIcon={setPriorityIcon}
        edit={edit}
      />

      {/* //options// */}
    </div>
  );
}
