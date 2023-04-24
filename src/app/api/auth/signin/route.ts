import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { prisma } from "../../../../../utilities/db";

export async function POST(req: Request, res: Response) {
  const { email, password } = await req.json();

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },

    {
      valid: validator.isLength(password, { min: 1 }),
      errorMessage: "Password is invalid",
    },
  ];

  const errors: string[] = [];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length === 0) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          if (user.status != "active") {
            return NextResponse.json(
              "Pending Account. Please Verify Your Email!",
              {
                status: 401,
              }
            );
          }
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
        } else {
          return NextResponse.json("email or password are incorrect", {
            status: 401,
          });
        }
      } else {
        return NextResponse.json("email or password are incorrect", {
          status: 401,
        });
      }
    } catch (error) {
      return NextResponse.json("SERVER ERROR", { status: 500 });
    }
  } else {
    return NextResponse.json(errors, { status: 400 });
  }
}
