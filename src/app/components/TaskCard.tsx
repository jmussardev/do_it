"use client";
import Image from "next/image";
import { useState } from "react";

import delIcon from "./../../../public/icons/delete.png";
import pencil from "./../../../public/icons/pencil.png";
import check from "./../../../public/icons/check.png";
import chrono from "./../../../public/icons/chrono.png";
import play from "./../../../public/icons/play.png";
import p1 from "./../../../public/icons/p1.png";
import p2 from "./../../..//public/icons/p2.png";
import p3 from "./../../../public/icons/p3.png";

export default function TaskCard() {
  const [priority, setPriority] = useState(p1);
  const [edit, setEdit] = useState(false);
  function switchPriotity() {
    switch (priority) {
      case p1:
        return setPriority(p2);
      case p2:
        return setPriority(p3);
      case p3:
        return setPriority(p1);

      default:
        break;
    }
  }
  console.log(p1);

  return (
    <div className="relative flex p-2 w-full h-[6rem] mb-2 border-2 border-black rounded-lg">
      {/* //overlay// */}
      <div
        className="opacity-0 hover:opacity-100 transition-all ease-in "
        hidden={edit ? true : false}
      >
        <div className="absolute  flex justify-evenly items-center rounded-lg w-full h-full top-0 left-0 bg-gray-100 bg-opacity-60">
          <button className=" h-7 w-7 hover:scale-125">
            <Image src={check} alt="" />
          </button>
          <button
            className=" h-6 w-6 hover:scale-125"
            onClick={() => {
              setEdit(true);
            }}
          >
            <Image src={pencil} alt="" />
          </button>
          <button className=" h-6 w-6 hover:scale-125">
            <Image src={chrono} alt="" />
          </button>
          <button className=" h-5 w-5 hover:scale-125">
            <Image src={play} alt="" />
          </button>
        </div>
      </div>
      {/* //overlay// */}
      {/* //description// */}
      <div className="flex items-center w-4/5 p-2">
        <input
          className="w-full h-full border-transparent focus:outline-none "
          readOnly={edit ? false : true}
          type="text"
          placeholder="Describe your task.."
          onBlur={() => {
            setEdit(false);
          }}
        />
      </div>
      {/* //description// */}
      {/* //options// */}
      <div className="w-1/5 flex flex-col justify-between ">
        <div className="flex justify-end ">
          <button
            className="w-5 h-5 hover:scale-125"
            onClick={() => {
              switchPriotity();
            }}
          >
            <Image src={priority} alt="priority" />
          </button>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-[4px] h-5 hover:scale-125 "
            hidden={edit ? false : true}
          >
            <Image src={delIcon} alt="" />
          </button>
        </div>
        {/* //options// */}
      </div>
    </div>
  );
}
