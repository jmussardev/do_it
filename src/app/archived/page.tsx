import getDate from "../../../utilities/date";
import { prisma } from "../../../utilities/db";
import Link from "next/link";
import archive from "./../../../public/icons/archive.png";
import Image from "next/image";
import { motion } from "framer-motion";
import ArchivedLink from "../components/ArchivedLink";

const { getWeek, dayOfWeek } = getDate();
const currentWeek = parseInt(getWeek());

// fetch all tasks before this week
const fetchWeekTasks = async () => {
  const tasks = await prisma.task.findMany({
    where: {
      week: { lt: currentWeek },
    },
    select: {
      week: true,
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
    <div className="flex flex-col h-full w-full p-10 items-center justify-center overflow-y-auto  ">
      <ul className="w-full text-center font-bold text-lg">
        {uniq.map((week, i) => (
          <li key={i} className="w-full mb-3">
            <ArchivedLink
              week={week}
              date1={dayOfWeek("1", week.toString())}
              date2={dayOfWeek("7", week.toString())}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
