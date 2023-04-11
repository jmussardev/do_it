import Tasks from "./components/Tasks";
const dayjs = require("dayjs");

import { prisma } from "./../../utilities/db";
import { PRIORITY } from "@prisma/client";
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
  const dateSpt = today.split("-");
  const dateNum = `${dateSpt[2]}/${dateSpt[3]}`;
  console.log(today);
  const tasks = await fetchDayTasks(today);
  return (
    <div className=" h-full cardpattern sm:bg-white">
      {/* //header// */}
      <div className="w-full  h-fit  pb-5 flex justify-center border-black border-b-2">
        <div className="w-[8rem] h-[5rem] rounded-b-md bg-black -- text-white font-bold flex flex-col justify-center items-center">
          <p>{dateSpt[0]}</p>
          <p>{dateNum}</p>
        </div>
      </div>
      {/* //header// */}

      {/* //tasks// */}
      <div className=" h-5/6 overflow-auto  ">
        <Tasks tasks={tasks} />
      </div>
      {/* //tasks// */}
    </div>
  );
}
