/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import tuto01 from "./../img/tuto-01.gif";
import tuto02 from "./../img/tuto-02.gif";
import tuto03 from "./../img/tuto-03.gif";
import tuto04 from "./../img/tuto-04.gif";
import p1 from "./../img/p1.png";
import p2 from "./../img/p2.png";
import p3 from "./../img/p3.png";
import { getTasks } from "../../../utilities/getTasks";
import BtnTuto from "./BtnTuto";

export default function TutoToday({
  payload,
  name,
}: {
  payload: string;
  name: string;
}) {
  return (
    <div className="absolute top-0 px-5 py-5 z-30 text-black  h-full w-full bg-gray-300 bg-opacity-60 ">
      <div className="overflow-y-auto h-full w-full flex flex-col  items-center p-4 text-center font-bold bg-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.3)]  rounded-lg">
        <div className="mb-4">
          <p className="text-2xl">
            Hello<span className="capitalize"> {name} </span>
          </p>
          <p className=" text-2xl mb-4">welcome on DO.IT !</p>
          <p>👉 To get started create your first task</p>
        </div>
        <Image className=" w-80 mb-4" src={tuto01} alt="" />
        <p>❗You can prioritize your tasks from important to❗</p>
        <p> SUPER DUPER URGENT!!! </p>
        <div className="flex mt-2 mb-4 ">
          <Image className="h-8 w-8" src={p1} alt="" />
          <Image className="h-8 w-8 ml-4" src={p2} alt="" />
          <Image className="h-8 w-8 ml-4" src={p3} alt="" />
        </div>
        <p>Click on the task to open the overlay menu</p>
        <Image className=" w-[20rem] mt-2 mb-4 " src={tuto02} alt="" />
        <p>⏱️To be efficient there is the timer !⏱️</p>
        <Image className=" w-[20rem] mt-2 mb-4 " src={tuto03} alt="" />
        <p>❌ And if you want to delete a task ❌ </p>
        <p>There is two ways..</p>
        <p>But frankly, just swipe right ! ;)</p>
        <Image className=" w-[20rem] mt-2 mb-8 " src={tuto04} alt="" />
        <BtnTuto payload={payload} text="I'm ready" tuto="today" />
      </div>
    </div>
  );
}
