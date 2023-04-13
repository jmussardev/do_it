import getDate from "../../../../utilities/date";
import { prisma } from "../../../../utilities/db";
import { TaskType } from "../../page";
import Week from "../../components/Week";
const { today, day, getWeek, dayNum } = getDate();
const currentWeek = parseInt(getWeek());

interface Tasks extends TaskType {
  date: string;
}

//fetch data of the week
const fetchWeekTasks = async (): Promise<Tasks[]> => {
  const tasks = await prisma.task.findMany({
    where: {
      week: currentWeek,
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

export default async function MyWeek({ params }: { params: { day: string } }) {
  console.log(params);
  const tasks = await fetchWeekTasks();

  return (
    <>
      <Week tasks={tasks} day={params.day} />
    </>
  );
}
