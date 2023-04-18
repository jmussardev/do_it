/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname, useRouter } from "next/navigation";
import { TaskType } from "../page";
import TaskCard from "./TaskCard";
import getDate from "../../../utilities/date";
import { useTask } from "../../../hooks/useTask";
import Image from "next/image";
import cross_rounded from "./../../../public/icons/cross_rounded.png";
import { useEffect, useState } from "react";

interface Tasks extends TaskType {
  date: string;
}
interface TaskProps {
  tasks: Tasks[];
  onWeek?: boolean;
  isArchived?: boolean;
}

export default function Tasks({ tasks, onWeek, isArchived }: TaskProps) {
  const { createTask } = useTask();
  const { getDay, today, dayOfWeek } = getDate();
  const router = useRouter();
  const tDayNum = getDay(today());
  const url = usePathname();
  const dayPage = url.split("/")[url.split("/").length - 1];
  const isOldTask = () => {
    if (dayPage) {
      if (dayPage < tDayNum) return true;
    } else return false;
  };
  const [onCreate, setOnCreate] = useState(false);

  const handleCreate = async () => {
    if (onWeek) {
      await createTask({
        date: dayOfWeek(dayPage),
        user_id: 1,
        description: "",
        timer: 0,
        priority: "ONE",
      });
      setOnCreate(true);
      router.refresh();
    } else {
      await createTask({
        date: today(),
        user_id: 1,
        description: "",
        timer: 0,
        priority: "ONE",
      });
      // setOnCreate(true);
      router.refresh();
    }
  };

  let tasksList = tasks;

  tasksList = tasksList.sort((t1, t2) =>
    t1.id < t2.id ? -1 : t1.id > t2.id ? 1 : 0
  );
  tasksList = tasksList.sort((task) => (task.iscompleted === true ? 1 : -1));
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>
      <ul className="relative px-[1rem]  xsm:px-[4rem] py-[3rem] h-full   ">
        {tasksList.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            onWeek={onWeek}
            date={task.date}
            isOld={isOldTask()}
            isArchived={isArchived}
            onCreate={onCreate}
            setOnCreate={setOnCreate}
          />
        ))}
        {isOldTask() || isArchived ? (
          ""
        ) : (
          <button
            title="add a task"
            className="absolute top-1 right-3 sm:top-5 sm:right-3 ## flex items-center justify-center ## h-10 w-10 bg-white drop-shadow-lg active:drop-shadow-md rounded-lg  ##   "
            onClick={() => {
              handleCreate();
            }}
          >
            <div className="  rotate-45 h-6 w-6">
              <Image src={cross_rounded} alt="" />
            </div>
          </button>
        )}
      </ul>
    </>
  );
}
