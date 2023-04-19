import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../utilities/db";

export interface UserEmailJwtPayload extends jwt.JwtPayload {
  email: string;
}

export async function GET(req: Request) {
  const bearerToken = req.headers.get("authorization");

  if (!bearerToken) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request aa" },
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];

  const payload = <UserEmailJwtPayload>jwt.decode(token);

  if (!payload.email) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request " },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
    },
  });
  if (!user) {
    return NextResponse.json("User not found", { status: 401 });
  }
  return NextResponse.json(
    {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    },
    { status: 200 }
  );
}
