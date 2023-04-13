import Tasks from "./components/Tasks";
import { prisma } from "./../../utilities/db";
import { PRIORITY } from "@prisma/client";
import TodayHeader from "./components/TodayHeader";
import getDate from "../../utilities/date";

export interface TaskType {
  id: number;
  description: string;
  priority: PRIORITY;
  week: number;
  user_id: number;
  timer: number;
  iscompleted: boolean;
  date: string;
}
const { today } = getDate();

const date = today();

const fetchDayTasks = async (date: string): Promise<TaskType[]> => {
  const tasks = await prisma.task.findMany({
    where: {
      date: date,
    },
    select: {
      id: true,
      description: true,
      priority: true,
      week: true,
      user_id: true,
      timer: true,
      iscompleted: true,
      date: true,
    },
  });

  return tasks;
};

export default async function Home() {
  const tasks = await fetchDayTasks(date);
  return (
    <div className=" h-full cardpattern sm:bg-white">
      {/* //header// */}
      <TodayHeader />
      {/* //header// */}

      {/* //tasks// */}
      <div className=" h-5/6 overflow-auto  ">
        <div>{}</div>
        <Tasks tasks={tasks} />
      </div>
      {/* //tasks// */}
    </div>
  );
}
