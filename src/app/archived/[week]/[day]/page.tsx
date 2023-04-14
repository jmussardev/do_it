import ArchivedWeek from "@/app/components/ArchivedWeek";
import getDate from "../../../../../utilities/date";
import { prisma } from "../../../../../utilities/db";
import { TaskType } from "../../../page";

const { today, day, getWeek, dayNum } = getDate();
const currentWeek = parseInt(getWeek());

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
  console.log(oldTasks);

  let oldWeeks: number[] = [];
  oldTasks.forEach((task) => {
    oldWeeks.push(task.week);
  });
  const uniqSet = new Set(oldWeeks);
  const uniq = [...uniqSet];
  {
    /* <ArchivedWeek OldTasks={oldTasks} />; */
  }
  return <ArchivedWeek oldTasks={oldTasks} />;
}
