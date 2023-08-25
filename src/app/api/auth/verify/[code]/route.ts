import { NextResponse } from "next/server";
import { prisma } from "../../../../../../utilities/db";

export async function GET(req: Request, context: { params: any }) {
  const { code } = context.params;

  try {
    const user = await prisma.user.findUnique({
      where: { confirmationCode: code },
    });

    if (!user) {
      return NextResponse.json("User Not found.", { status: 404 });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { status: "active" },
    });

    // const alg = "HS256";
    // const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // const token = await new jose.SignJWT({
    //   email: user.email,
    // })
    //   .setProtectedHeader({ alg })
    //   .setExpirationTime("24h")
    //   .sign(secret);

    return NextResponse.redirect(
      new URL("https://do-it-pearl-one.vercel.app/")
    );
  } catch (error) {
    return NextResponse.json(error, { status: 404 });
  }
}
