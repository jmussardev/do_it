/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { notFound, usePathname, useRouter } from "next/navigation";
import TaskCard from "./TaskCard";
import getDate from "../../../utilities/date";
import { useTask } from "../../../hooks/useTask";
import Image, { StaticImageData } from "next/image";
import cross_rounded from "./../../../public/icons/cross_rounded.png";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Task } from "../../../config/types";
import useSWR, { mutate } from "swr";
import axios from "axios";
import DotLoading from "./DotLoading";
import OptionPriority from "./OptionPriority";
import done from "./../../../public/icons/done.png";
import delIcon from "./../../../public/icons/delete.png";
interface TaskProps {
  tasks?: Task[];
  onWeek?: boolean;
  isArchived?: boolean;
  payload?: string;
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Tasks({
  onWeek,
  isArchived,
  payload,
  tasks,
}: TaskProps) {
  const { createTask } = useTask();
  const { getDay, today, dayOfWeekFull, getWeek } = getDate();
  const currentWeek = parseInt(getWeek());
  const router = useRouter();
  const tDayNum = getDay(today());
  const url = usePathname();
  const dayPage = url.split("/")[url.split("/").length - 1];
  const [isFormOP, setIsFormOp] = useState(false);
  const [priorityIcon, setPriorityIcon] = useState<StaticImageData>();
  const [inputs, setInputs] = useState({
    id: 0,
    description: "",
    priority: "ONE",
    timer: 0,
    iscompleted: false,
  });
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleDelete = () => {
    setIsFormOp(false);
    setInputs({
      ...inputs,
      description: "",
      priority: "ONE",
    });

    // router.refresh();
  };
  const isOldTask = () => {
    if (dayPage) {
      if (dayPage < tDayNum) return true;
    } else return false;
  };

  const { data, error, isLoading } = useSWR(
    !isArchived ? (onWeek ? null : `/api/task/${payload}`) : null,
    fetcher
  );

  let tasksList: Task[] | undefined = isArchived || onWeek ? tasks : [];

  const handleCreate = async () => {
    const id = Math.floor(Math.random() * 10000);
    let email = "";
    if (payload) {
      email = payload;
    }
    if (onWeek) {
      const FAKE_TASK = {
        date: dayOfWeekFull(dayPage),
        description: inputs.description,
        id,
        iscompleted: false,
        priority: inputs.priority,
        timer: 0,
        user_id: id,
        week: currentWeek,
      };

      mutate(
        `/api/task/${payload}/week`,
        (data: any) => {
          return [...data, FAKE_TASK];
        },
        false
      );

      await createTask({
        date: dayOfWeekFull(dayPage),
        description: inputs.description,
        timer: 0,
        priority: inputs.priority,
        email: email,
      });

      mutate(`/api/task/${payload}/week`);
    } else {
      const FAKE_TASK = {
        date: today(),
        description: inputs.description,
        id,
        iscompleted: false,
        priority: inputs.priority,
        timer: 0,
        user_id: id,
        week: currentWeek,
      };

      mutate(
        `/api/task/${payload}`,
        (data: any) => {
          return [...data, FAKE_TASK];
        },
        false
      );

      const { data }: any = await createTask({
        date: today(),
        description: inputs.description,
        timer: 0,
        priority: inputs.priority,
        email: email,
      });

      mutate(`/api/task/${payload}`);
    }
    setIsFormOp(false);
    setInputs({
      ...inputs,
      description: "",
      priority: "ONE",
    });
  };

  if (!isLoading) {
    if (data) {
      tasksList = data;
    }
  }
  tasksList = tasksList?.sort((t1, t2) =>
    t1.id < t2.id ? -1 : t1.id > t2.id ? 1 : 0
  );
  tasksList = tasksList?.sort((task) => (task.iscompleted === true ? 1 : -1));
  if (!payload) {
    notFound();
  }

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>
      {/* {isLoading && <DotLoading />} */}

      {tasksList?.length === 0 && !isFormOP ? (
        isOldTask() || isArchived ? (
          <div className="font-bold text-center mt-10">
            <p>Well.. you were not busy that day</p> <p>Lucky you !</p>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-20 pb-4  w-full">
            <div className="font-bold text-center mr-4">
              Ok let's get started !{" "}
            </div>
            <motion.div
              animate={{
                rotate: [0, 0, 100, 180, 0, 0],
                boxShadow: "0 0px 20px 0 rgba(0, 0, 0, 0.2)",
                borderRadius: "50%",
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.7, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 4,
              }}
            >
              <button
                title="add a task"
                className="origin-center flex items-center justify-center  ## h-8 w-8 bg-white  active:drop-shadow-md rounded-lg  ##   "
                onClick={() => {
                  setIsFormOp(true);
                }}
              >
                <div className="  rotate-45 h-6 w-6">
                  <Image src={cross_rounded} alt="" />
                </div>
              </button>
            </motion.div>
          </div>
        )
      ) : (
        <ul className="relative px-[1rem]  xsm:px-[4rem] py-[3rem] h-full   ">
          {/* ::vvvFORMvvv:: */}
          {isFormOP && (
            <div className="rounded-lg p-[3px] w-full h-[6.25rem]  drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)] ">
              <div
                className={`  overflow-hidden  relative font-bold flex p-2 w-full h-full mb-2   rounded-lg bg-white  `}
              >
                {/* //options// */}
                <OptionPriority
                  inputs={inputs}
                  setInputs={setInputs}
                  priorityIcon={priorityIcon}
                  setPriorityIcon={setPriorityIcon}
                  isOld={isOldTask()}
                  isArchived={isArchived}
                />
                {/* //options// */}
                {/* //description// */}
                <div className={`flex items-center w-4/5 p-2  `}>
                  <input
                    className={`w-full h-full border-transparent bg-transparent placeholder:text-gray-200  focus:outline-none `}
                    type="text"
                    value={inputs.description}
                    placeholder="Describe your task.."
                    name="description"
                    onChange={(e) => {
                      handleChangeInput(e);
                    }}
                  />
                </div>
                {/* //description// */}
                {/* //btns// */}
                <div className="absolute top-0 right-0 border-r-lg ml-3 flex flex-col h-full w-14 ">
                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                    title="delete"
                    className="flex  justify-center items-center border-b-2 w-full h-1/3"
                  >
                    <div>
                      <Image src={delIcon} alt="" />
                    </div>
                  </button>

                  <button
                    disabled={inputs.description === "" ? true : false}
                    title="confirm"
                    className=" disabled:opacity-20 flex justify-center items-center w-full h-2/3"
                    onClick={() => {
                      handleCreate();
                    }}
                  >
                    <div className=" h-4 w-4 ">
                      <Image src={done} alt="" />
                    </div>
                  </button>
                </div>
                {/* //btns// */}
              </div>
            </div>
          )}
          {/* ::^^^FORM^^^:: */}
          {tasksList?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onWeek={onWeek}
              date={task.date}
              isOld={isOldTask()}
              isArchived={isArchived}
            />
          ))}

          {isOldTask() || isArchived ? (
            ""
          ) : (
            <motion.button
              initial={{ y: 0, x: 150 }}
              animate={{ y: 0, x: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
              title="add a task"
              className="absolute top-1 right-3 sm:top-5 sm:right-3 ## flex items-center justify-center ## h-10 w-10 bg-white drop-shadow-lg active:drop-shadow-md rounded-lg  ##   "
              onClick={() => {
                setIsFormOp(true);
              }}
            >
              <div className="  rotate-45 h-6 w-6">
                <Image src={cross_rounded} alt="" />
              </div>
            </motion.button>
          )}
        </ul>
      )}
    </>
  );
}
