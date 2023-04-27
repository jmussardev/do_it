import { NextResponse } from "next/server";
import { prisma } from "../../../../../../utilities/db";

export async function GET(req: Request, context: { params: any }) {
  const { email, tuto } = context.params;

  try {
    const result = await prisma.user.update({
      where: {
        email: email,
      },
      data: { [tuto]: true },
    });

    if (result) {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json("User Not Found", { status: 401 });
  }
}
