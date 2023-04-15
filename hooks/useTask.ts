"use client";
import { PRIORITY } from "@prisma/client";
import axios from "axios";

export const useTask = () => {
  const createTask = async ({
    user_id,
    description,
    priority,
    timer,
  }: {
    user_id: number;
    description: string;
    priority: string;
    timer: number;
  }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/task", {
        user_id,
        description,
        priority,
        timer,
      });
    } catch (e: any) {
      console.log(e);
    }
  };
  const updateTask = async ({
    taskId,
    description,
    priority,
    timer,
    iscompleted,
  }: {
    taskId: number;
    description: string;
    priority: string;
    timer: number;
    iscompleted: boolean;
  }) => {
    try {
      const response = await axios.put("http://localhost:3000/api/task", {
        taskId,
        description,
        priority,
        timer,
        iscompleted,
      });
    } catch (e: any) {
      console.log(e);
    }
  };
  const deleteTask = async ({ taskId }: { taskId: number }) => {
    try {
      const response = await axios({
        method: "delete",
        url: "http://localhost:3000/api/task",
        data: {
          taskId: "taskId",
        },
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  return {
    createTask,
    updateTask,
    deleteTask,
  };
};
