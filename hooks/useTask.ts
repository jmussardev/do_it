"use client";
import axios from "axios";

export const useTask = () => {
  const createTask = async ({
    description,
    priority,
    timer,
    date,
    email,
  }: {
    description: string;
    priority: string;
    timer: number;
    date: string;
    email: string;
  }) => {
    try {
      const result = await axios.get(`/api/user/${email}`);
      const userId = result.data.id;

      try {
        const response = await axios.post("/api/task", {
          userId,
          description,
          priority,
          timer,
          date,
        });
        return response;
      } catch (e: any) {
        console.log(e);
      }
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
      const response = await axios.put("/api/task", {
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
        url: "/api/task",
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
