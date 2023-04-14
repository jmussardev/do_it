import getDate from "../../../utilities/date";
import { TaskType } from "../page";
import Tasks from "./Tasks";
import WeekNavBar from "./WeekNavBar";
interface Tasks extends TaskType {
  date: string;
}
const { getDay, compareDate } = getDate();

export default function Week({
  tasks,
  day,
  isArchived,
}: {
  tasks: Tasks[];
  day?: string;
  isArchived?: boolean;
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
        />
      </div>
    </div>
  );
}
