import { NextResponse } from "next/server";
import { prisma } from "../../../../../../utilities/db";
import getDate from "../../../../../../utilities/date";
const { today } = getDate();

export async function GET(req: Request, context: { params: any }) {
  const { user } = context.params;
  const email = user;

  try {
    const doneNum = await prisma.user.findUnique({
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

    const tasksNum = await prisma.user.findUnique({
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

    if (doneNum && tasksNum) {
      return NextResponse.json(
        { tasksNum: tasksNum.tasks.length, doneNum: doneNum.tasks.length },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json("User Not Found", { status: 401 });
  }
}
