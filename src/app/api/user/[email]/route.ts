import { NextResponse } from "next/server";
import { prisma } from "../../../../../utilities/db";
import getDate from "../../../../../utilities/date";
const { today, getWeek } = getDate();

export async function GET(req: Request, context: { params: any }) {
  const { email } = context.params;

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
      console.log("@#@#@#@#@#@#@");
      console.log(result);
      console.log("@#@#@#@#@#@#@");
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json("User Not Found", { status: 401 });
  }
}
