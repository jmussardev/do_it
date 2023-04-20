import { NextResponse } from "next/server";
import { prisma } from "../../../../../utilities/db";
import getDate from "../../../../../utilities/date";

const { today, getWeek } = getDate();
const week = parseInt(getWeek());

export async function GET(req: Request, context: { params: any }) {
  const { user } = context.params;
  const userId = parseInt(user);
  console.log(user);

  try {
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
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
    if (result) {
      return NextResponse.json(result.tasks, { status: 200 });
    }
  } catch (error) {
    console.log(error);
  }
}
