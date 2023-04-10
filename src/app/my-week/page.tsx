import Image from "next/image";
import { Inter } from "next/font/google";
import { Open_Sans } from "next/font/google";
import Tasks from "../components/Tasks";
import WeekNavBar from "../components/WeekNavBar";

// {/* <div className="sticky top-0 w-full h-[6rem]"></div> */}
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
