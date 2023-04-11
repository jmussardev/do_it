"use client";
import Image, { StaticImageData } from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

import { PRIORITY } from "@prisma/client";
import delIcon from "./../../../public/icons/delete.png";
import pencil from "./../../../public/icons/pencil.png";
import check from "./../../../public/icons/check.png";
import chrono from "./../../../public/icons/chrono.png";
import play from "./../../../public/icons/play.png";
import p1 from "./../../../public/icons/p1.png";
import p2 from "./../../..//public/icons/p2.png";
import p3 from "./../../../public/icons/p3.png";
import { TaskType } from "../page";
import TaskCardInput from "./TaskCardInput";

export default function TaskCard({ task }: { task: TaskType }) {
  const [inputs, setInputs] = useState({
    description: "",
    priority: "",
    timer: "",
    iscompleted: false,
  });
  const [priorityIcon, setPriorityIcon] = useState(p1);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [edit, setEdit] = useState(false);
  function switchPriorityInput() {
    switch (inputs.priority) {
      case PRIORITY.ONE:
        return (
          setInputs({
            ...inputs,
            priority: PRIORITY.TWO,
          }),
          setPriorityIcon(p2)
        );
      case PRIORITY.TWO:
        return (
          setInputs({
            ...inputs,
            priority: PRIORITY.THREE,
          }),
          setPriorityIcon(p3)
        );
      case PRIORITY.THREE:
        return (
          setInputs({
            ...inputs,
            priority: PRIORITY.ONE,
          }),
          setPriorityIcon(p1)
        );

      default:
        break;
    }
  }
  const setCurrentTask = () => {
    setInputs({
      description: task.description,
      priority: task.priority.toString(),
      timer: task.timer.toString(),
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
        <div className="absolute  flex justify-evenly items-center rounded-lg w-full h-full top-0 left-0 bg-gray-100 bg-opacity-60">
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
          <button className=" h-6 w-6 hover:scale-125">
            <Image src={chrono} alt="" />
          </button>
          <button className=" h-5 w-5 hover:scale-125">
            <Image src={play} alt="" />
          </button>
        </div>
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
      <div className="w-1/5 flex flex-col justify-between ">
        <div className="flex justify-end ">
          <button
            className="w-5 h-5 hover:scale-125"
            onClick={() => {
              switchPriorityInput();
            }}
          >
            <Image src={priorityIcon} alt="priority" />
          </button>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-[4px] h-5 hover:scale-125 "
            hidden={edit ? false : true}
          >
            <Image src={delIcon} alt="" />
          </button>
        </div>
        {/* //options// */}
      </div>
    </div>
  );
}
