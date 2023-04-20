"use client";
import { PRIORITY } from "@prisma/client";
import axios from "axios";
import { getCookie } from "cookies-next";

export const useTask = () => {
  const getDayTasks = async (user: string) => {
    const jwt = getCookie("jwt");
    const config = {
      headers: {
        authorization: jwt,
      },
    };
    try {
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response);

      // const tasks = await axios.get(`http://localhost:3000/api/task/${user}`);
      // return tasks;
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async ({
    user_id,
    description,
    priority,
    timer,
    date,
  }: {
    user_id: number;
    description: string;
    priority: string;
    timer: number;
    date: string;
  }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/task", {
        user_id,
        description,
        priority,
        timer,
        date,
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
          taskId: taskId,
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
