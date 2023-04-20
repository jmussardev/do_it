import { Task } from "../../../config/types";
import getDate from "../../../utilities/date";
import Tasks from "./Tasks";
import WeekNavBar from "./WeekNavBar";

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
  const onWeek = true;
  const dayTasks = tasks.filter((task) => getDay(task.date) == day);

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
