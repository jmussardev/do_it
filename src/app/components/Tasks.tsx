import { MutableRefObject } from "react";
import { TaskType } from "../page";
import TaskCard from "./TaskCard";
interface Tasks extends TaskType {
  date: string;
}
interface TaskProps {
  tasks: Tasks[];
  onWeek?: boolean;
}
export default function Tasks({ tasks, onWeek }: TaskProps) {
  return (
    <ul className="px-[1rem]  xsm:px-[4rem] py-[2rem] h-full   ">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onWeek={onWeek} date={task.date} />
      ))}

      <button className="h-10 hover:text-white hover:bg-black w-full font-bold border-2 border-black rounded-lg">
        add new task
      </button>
    </ul>
  );
}
