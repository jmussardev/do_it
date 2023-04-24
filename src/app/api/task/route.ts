import { NextResponse } from "next/server";
import { prisma } from "../../../../utilities/db";
import getDate from "../../../../utilities/date";

const { today, getWeek } = getDate();
const week = parseInt(getWeek());

export async function POST(req: Request) {
  const { description, priority, timer, date, userId } = await req.json();

  try {
    const response = await prisma.task.create({
      data: {
        user_id: userId,
        description: description,
        priority: priority,
        timer: timer,
        date: date,
        week: week,
        iscompleted: false,
      },
    });
    return NextResponse.json(
      {
        date: response.date,
        description: response.description,
        id: response.id,
        iscompleted: response.iscompleted,
        priority: response.priority,
        timer: response.timer,
        user_id: response.user_id,
        week: response.week,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req: Request) {
  const { description, priority, timer, iscompleted, taskId } =
    await req.json();

  try {
    console.log("@@@@@@@@@");
    console.log(iscompleted);
    console.log("@@@@@@@@@");
    const response = await prisma.task.update({
      where: { id: taskId },
      data: {
        description: description,
        priority: priority,
        timer: timer,
        iscompleted: iscompleted,
      },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: Request) {
  const { taskId } = await req.json();

  try {
    const createUser = await prisma.task.delete({
      where: { id: taskId },
    });
    return NextResponse.json(
      {
        taskId: taskId,
        message: "task deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
