import { NextResponse } from "next/server";
import { prisma } from "../../../../../utilities/db";
import getDate from "../../../../../utilities/date";
const { today, getWeek } = getDate();

export async function GET(req: Request, context: { params: any }) {
  const { user } = context.params;
  const email = user;

  try {
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
    if (result) {
      return NextResponse.json(result.tasks, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json("User Not Found", { status: 401 });
  }
}
