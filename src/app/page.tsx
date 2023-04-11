import Tasks from "./components/Tasks";
const dayjs = require("dayjs");

import { prisma } from "./../../utilities/db";
import { PRIORITY } from "@prisma/client";
import useTimer from "../../hooks/useTimer";
import { ChronoContext } from "./context/ChronoContext";
import { useContext } from "react";
import TodayHeader from "./components/TodayHeader";
export interface TaskType {
  id: number;
  description: string;
  priority: PRIORITY;
  week: number;
  user_id: number;
  timer: number;
  iscompleted: boolean;
}

const today = dayjs().format("dddd-YYYY-MM-DD");

const fetchDayTasks = async (today: string): Promise<TaskType[]> => {
  const tasks = await prisma.task.findMany({
    where: {
      date: today,
    },
    select: {
      id: true,
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

export default async function Home() {
  const tasks = await fetchDayTasks(today);
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
