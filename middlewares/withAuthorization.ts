import { jwtSecret } from "./../config/secret.ts";
import { getCookie } from "cookies-next";

import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./types";
import { jwtVerify, type JWTPayload } from "jose";

export const withAuthorization: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const bearerToken = request.cookies.get("jwt");

    const res = await next(request, _next);

    if (res) {
      if (!bearerToken) {
        NextResponse.json(
          { errorMessage: "Unauthorized request aa" },
          { status: 401 }
        );
        return res;
      }

      const token = bearerToken.value;
      if (!token) {
        return NextResponse.json(
          { errorMessage: "Unauthorized request bb" },
          { status: 401 }
        );
      }

      try {
        const isValid = await jwtVerify(token, jwtSecret);
        if (isValid) {
          return res;
        }
      } catch (error) {
        return NextResponse.json(
          { errorMessage: "Unauthorized request cc" },
          { status: 401 }
        );
      }
    }
    return NextResponse.redirect(new URL("http://localhost:3000"));
  };
};
