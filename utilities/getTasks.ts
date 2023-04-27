import { Task } from "../config/types";
import getDate from "./date";
import { prisma } from "./db";
import { notFound } from "next/navigation";
const { today, getWeek } = getDate();
const currentWeek = parseInt(getWeek());

export const getTasks = () => {
  const getAll = async (email: string): Promise<Task[]> => {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        tasks: {
          where: {
            date: today(),
          },
          select: {
            id: true,
            description: true,
            priority: true,
            week: true,
            user_id: true,
            timer: true,
            iscompleted: true,
            date: true,
          },
        },
      },
    });
    if (!result) {
      notFound();
    }

    return result.tasks;
  };
  const getByWeek = async (email: string): Promise<Task[]> => {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        tasks: {
          where: {
            week: currentWeek,
          },
          select: {
            id: true,
            description: true,
            priority: true,
            week: true,
            user_id: true,
            timer: true,
            iscompleted: true,
            date: true,
          },
        },
      },
    });
    if (!result) {
      notFound();
    }

    return result.tasks;
  };
  const getOldWeeks = async (email: string) => {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        tasks: {
          where: {
            week: { lt: currentWeek },
          },
          select: {
            week: true,
          },
        },
      },
    });
    if (!result) {
      notFound();
    }

    return result.tasks;
  };
  const getOld = async (email: string) => {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        tasks: {
          where: {
            week: { lt: currentWeek },
          },
          select: {
            id: true,
            date: true,
            description: true,
            priority: true,
            week: true,
            user_id: true,
            timer: true,
            iscompleted: true,
          },
        },
      },
    });
    if (!result) {
      notFound();
    }

    return result.tasks;
  };
  const getTasksDone = async (email: string) => {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        tasks: {
          where: {
            date: today(),
            iscompleted: true,
          },
          select: {
            id: true,
          },
        },
      },
    });
    if (!result) {
      notFound();
    }

    return result.tasks.length;
  };
  const getNumTasks = async (email: string) => {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        tasks: {
          where: {
            date: today(),
          },
          select: {
            id: true,
          },
        },
      },
    });
    if (!result) {
      notFound();
    }

    return result.tasks.length;
  };
  const areTutosDone = async (email: string) => {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        first_name: true,
        today: true,
        myweek: true,
        archived: true,
      },
    });
    if (!result) {
      notFound();
    }

    return result;
  };

  const setTutosDone = async (email: string, tuto: string) => {
    const result = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        [tuto]: true,
      },
    });
    if (!result) {
      notFound();
    }

    return result;
  };
  //   const getName = async (email: string)=> {
  //     const result = await prisma.user.findUnique({
  //       where: {
  //         email: email,
  //       },
  //       select: {
  //         first_name: true,
  //     });
  //     if (!result) {
  //       notFound();
  //     }

  //     return result;
  //   };

  //   }
  // };
  return {
    getAll,
    getByWeek,
    getOldWeeks,
    getOld,
    getTasksDone,
    getNumTasks,
    areTutosDone,
    setTutosDone,
  };
};
