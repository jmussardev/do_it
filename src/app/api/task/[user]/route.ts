import { NextResponse } from "next/server";
import { prisma } from "../../../../../utilities/db";

export async function GET(req: Request, context: { params: any }) {
  const { user } = context.params;
  const email = user;

  try {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
    if (result) {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json("User Not Found", { status: 401 });
  }
}
