"use client";
import { ChangeEvent, useContext, useEffect, useState } from "react";

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

export default function TaskCard({ task }: { task: TaskType }) {
  const [inputs, setInputs] = useState({
    description: "",
    priority: "",
    timer: 0,
    iscompleted: false,
  });
  const [priorityIcon, setPriorityIcon] = useState<StaticImageData>(p1);
  const [isChronoOpen, setIsChronoOpen] = useState(false);
  const { setTimerState, start, end, value } = useContext(ChronoContext);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [edit, setEdit] = useState(false);

  const setCurrentTask = () => {
    setInputs({
      description: task.description,
      priority: task.priority,
      timer: task.timer,
      iscompleted: task.iscompleted,
    });
  };

  useEffect(() => {
    setCurrentTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex p-2 w-full h-[6rem] mb-2 border-2 border-black rounded-lg bg-white">
      {/* //overlay// */}
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
            start={start}
            end={end}
            setTimerState={setTimerState}
          />
        )}
      </div>
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
