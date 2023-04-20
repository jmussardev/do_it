import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { prisma } from "../../../../../utilities/db";

export async function POST(req: Request) {
  const { firstName, lastName, email, password } = await req.json();
  console.log(firstName, lastName, email, password);

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, { min: 1, max: 20 }),
      errorMessage: "First name is invalid",
    },
    {
      valid: validator.isLength(lastName, { min: 1, max: 20 }),
      errorMessage: "Last name is invalid",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },

    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password isn't strong enough",
    },
  ];

  const userWithEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (userWithEmail) {
    errors.push("Email already exist");
  }
  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return NextResponse.json(errors, { status: 400 });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        email,
      },
    });
    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);
    const res = NextResponse.json(
      {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
      {
        status: 200,
      }
    );

    res.cookies.set({
      name: "jwt",
      value: token,
      maxAge: 60 * 30,
    });

    return res;
  } catch (error) {
    throw new Error("error in user creation");
  }
}