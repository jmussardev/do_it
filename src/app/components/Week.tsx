import Tasks from "./Tasks";
import WeekNavBar from "./WeekNavBar";

export default function Week() {
  return (
    <div className="relative h-full w-full ">
      <WeekNavBar />

      <div className="bg-blue-400   w-full  overflow-auto ">
        <Tasks />
      </div>
    </div>
  );
}
