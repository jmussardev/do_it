"use client";
import { usePathname, useRouter } from "next/navigation";
import { TaskType } from "../page";
import TaskCard from "./TaskCard";
import getDate from "../../../utilities/date";
import { useTask } from "../../../hooks/useTask";
import Image from "next/image";
import cross_rounded from "./../../../public/icons/cross_rounded.png";

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
  const { getDay, today } = getDate();
  const router = useRouter();
  const tDayNum = getDay(today());
  const url = usePathname();
  const dayPage = url.split("/")[url.split("/").length - 1];
  const isOldTask = () => {
    if (dayPage) {
      if (dayPage < tDayNum) return true;
    } else return false;
  };

  const handleCreate = async () => {
    await createTask({
      user_id: 1,
      description: "",
      timer: 0,
      priority: "ONE",
    });
    router.refresh();
  };

  //=> delete element task from DOM
  let tasksList = tasks;

  tasksList = tasksList.sort((t1, t2) =>
    t1.id < t2.id ? -1 : t1.id > t2.id ? 1 : 0
  );
  tasksList = tasksList.sort((task) => (task.iscompleted === true ? 1 : -1));

  return (
    <>
      <ul className="relative px-[1rem]  xsm:px-[4rem] py-[2rem] h-full   ">
        {tasksList.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            onWeek={onWeek}
            date={task.date}
            isOld={isOldTask()}
            isArchived={isArchived}
          />
        ))}
        {isOldTask() || isArchived ? (
          ""
        ) : (
          <button
            className="absolute top-5 right-3 ## h-10 w-10 ## font-bold border-2 border-black rounded-lg  ##   "
            onClick={() => {
              handleCreate();
            }}
          >
            {" "}
            <div className="rotate-45">
              <Image src={cross_rounded} alt="" />
            </div>
          </button>
        )}
      </ul>
    </>
  );
}
