"use client";

import { usePathname } from "next/navigation";
import Week from "./Week";
import { Task } from "../../../config/types";

export default function ArchivedWeek({ oldTasks }: { oldTasks: Task[] }) {
  const url = usePathname();
  const weekPage = parseInt(url.split("/")[url.split("/").length - 2]);
  const oldtasksWeek = oldTasks.filter((t) => t.week === weekPage);
  const day = url.split("/")[url.split("/").length - 1];
  const isArchived = true;

  return <Week tasks={oldtasksWeek} day={day} isArchived={isArchived} />;
}
