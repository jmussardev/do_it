"use client";

import Image from "next/image";
import cross_rounded from "./../../../public/icons/cross_rounded.png";
import { motion } from "framer-motion";
import { useTask } from "../../../hooks/useTask";
import { usePathname } from "next/navigation";
import getDate from "../../../utilities/date";
const { getDay, today, dayOfWeekFull, getWeek } = getDate();
const currentWeek = parseInt(getWeek());

export default function CreateTask({
  isOldTask,
  isArchived,
  email,
  onWeek,
  mutate,
}: {
  isOldTask?: boolean;
  isArchived?: boolean;
  email: string;
  onWeek?: boolean;
  mutate: any;
}) {
  const url = usePathname();
  const { createTask } = useTask();
  const dayPage = url.split("/")[url.split("/").length - 1];

  const handleCreate = async () => {
    if (onWeek) {
      try {
        await createTask({
          date: dayOfWeekFull(dayPage),

          description: "",
          timer: 0,
          priority: "ONE",
          email: email,
        });
      } catch (error) {}

      // router.refresh();
    } else {
      const id = Math.floor(Math.random() * 10000);

      const FAKE_TASK = {
        date: today(),
        description: "",
        id,
        iscompleted: false,
        priority: "ONE",
        timer: 0,
        user_id: id,
        week: currentWeek,
      };

      mutate((data: any) => {
        return [...data, FAKE_TASK];
      }, false);

      const { data }: any = await createTask({
        date: today(),
        description: "",
        timer: 0,
        priority: "ONE",
        email: email,
      });

      mutate();
    }
  };
  return (
    <>
      {" "}
      {isOldTask || isArchived ? (
        ""
      ) : (
        <motion.button
          initial={{ y: 0, x: 150 }}
          animate={{ y: 0, x: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
          title="add a task"
          className="absolute top-1 right-3 sm:top-5 sm:right-3 ## flex items-center justify-center ## h-10 w-10 bg-white drop-shadow-lg active:drop-shadow-md rounded-lg  ##   "
          onClick={() => {
            handleCreate();
          }}
        >
          <div className="  rotate-45 h-6 w-6">
            <Image src={cross_rounded} alt="" />
          </div>
        </motion.button>
      )}
    </>
  );
}
