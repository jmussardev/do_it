"use client";

import { usePathname } from "next/navigation";
import { TaskType } from "../page";
import Week from "./Week";

interface Tasks extends TaskType {
  date: string;
}
export default function ArchivedWeek({ oldTasks }: { oldTasks: Tasks[] }) {
  const url = usePathname();
  const weekPage = parseInt(url.split("/")[url.split("/").length - 2]);
  const oldtasksWeek = oldTasks.filter((t) => t.week === weekPage);
  const day = url.split("/")[url.split("/").length - 1];

  return <Week tasks={oldtasksWeek} day={day} />;
}
