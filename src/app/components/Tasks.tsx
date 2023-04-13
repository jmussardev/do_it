"use client";
import { usePathname, useRouter } from "next/navigation";
import { TaskType } from "../page";
import TaskCard from "./TaskCard";
import getDate from "../../../utilities/date";
interface Tasks extends TaskType {
  date: string;
}
interface TaskProps {
  tasks: Tasks[];
  onWeek?: boolean;
}
export default function Tasks({ tasks, onWeek }: TaskProps) {
  const { getDay, today } = getDate();
  const tDayNum = getDay(today());
  const url = usePathname();
  const dayPage = url.split("/")[url.split("/").length - 1];
  const isOldTask = () => {
    if (dayPage < tDayNum) return true;
    else return false;
  };
  return (
    <>
      <ul className="px-[1rem]  xsm:px-[4rem] py-[2rem] h-full   ">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onWeek={onWeek}
            date={task.date}
          />
        ))}
        {isOldTask() ? (
          ""
        ) : (
          <button className="h-10 hover:text-white hover:bg-black w-full font-bold border-2 border-black rounded-lg">
            add new task
          </button>
        )}
      </ul>
    </>
  );
}
