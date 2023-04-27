"use client";
import axios from "axios";
import { Task } from "../../../config/types";
import getDate from "../../../utilities/date";
import Tasks from "./Tasks";
import WeekNavBar from "./WeekNavBar";
import useSWR from "swr";
import { Suspense } from "react";
import TasksLoader from "./TasksLoader";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const { getDay } = getDate();

export default function Week({
  tasks,
  day,
  isArchived,
  payload,
}: {
  tasks: Task[];
  day?: string;
  isArchived?: boolean;
  payload?: string;
}) {
  let tasksList: Task[] | undefined = isArchived ? tasks : [];
  const onWeek = true;
  const { data, error, isLoading } = useSWR(
    !isArchived ? `/api/task/${payload}/week` : null,
    fetcher
  );
  if (!isLoading) {
    if (data) {
      tasksList = data;
    }
  }

  const dayTasks = tasksList?.filter((task) => getDay(task.date) == day);

  return (
    <div className="relative h-full w-full ">
      <WeekNavBar />

      <div className="  w-full  overflow-auto ">
        <Tasks
          tasks={dayTasks}
          onWeek={onWeek}
          isArchived={isArchived ? true : false}
          payload={payload}
        />
      </div>
    </div>
  );
}
