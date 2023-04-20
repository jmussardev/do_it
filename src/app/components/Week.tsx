import { Task } from "../../../config/types";
import getDate from "../../../utilities/date";
import Tasks from "./Tasks";
import WeekNavBar from "./WeekNavBar";

const { getDay, compareDate } = getDate();

export default function Week({
  tasks,
  day,
  isArchived,
}: {
  tasks: Task[];
  day?: string;
  isArchived?: boolean;
}) {
  const onWeek = true;
  const dayTasks = tasks.filter((task) => getDay(task.date) == day);

  // console.log("###########");
  // console.log(day);
  // console.log("###########");
  // console.log("###########");
  // console.log(dayTasks);
  // console.log("###########");

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
