import { TaskType } from "../page";
import TaskCard from "./TaskCard";

export default function Tasks({ tasks }: { tasks: TaskType[] }) {
  return (
    <ul className="px-[1rem]  xsm:px-[4rem] py-[2rem] h-full   ">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}

      <button className="h-10 hover:text-white hover:bg-black w-full font-bold border-2 border-black rounded-lg">
        add new task
      </button>
    </ul>
  );
}
