import ArchivedWeek from "@/app/components/ArchivedWeek";
import getDate from "../../../utilities/date";
import { prisma } from "../../../utilities/db";
import { TaskType } from "../page";
import Link from "next/link";

const { today, day, getWeek, dayNum } = getDate();
const currentWeek = parseInt(getWeek());
console.log(currentWeek);

interface Tasks extends TaskType {
  date: string;
}

// fetch all tasks before this week
const fetchWeekTasks = async (): Promise<Tasks[]> => {
  const tasks = await prisma.task.findMany({
    where: {
      week: { lt: currentWeek },
    },
    select: {
      id: true,
      date: true,
      description: true,
      priority: true,
      week: true,
      user_id: true,
      timer: true,
      iscompleted: true,
    },
  });
  return tasks;
};

export default async function Archived() {
  const oldTasks = await fetchWeekTasks();

  let oldWeeks: number[] = [];
  oldTasks.forEach((task) => {
    oldWeeks.push(task.week);
  });
  const uniqSet = new Set(oldWeeks);
  const uniq = [...uniqSet];
  console.log(uniq);

  return (
    <div className="flex flex-col h-full w-full p-10 items-center  ">
      <ul className="w-full text-center font-bold text-lg">
        {uniq.map((week, i) => (
          <li key={i} className="w-full mb-3">
            <div className="flex items-center justify-center w-full h-[5rem]  rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white">
              <Link href={`/archived/${week}/1`}>archived week</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
