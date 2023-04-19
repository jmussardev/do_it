import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./types";
import * as jose from "jose";

export const withAuthorization: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const bearerToken = request.headers.get("authorization");

    const res = await next(request, _next);
    if (res) {
      if (!bearerToken) {
        return NextResponse.json(
          { errorMessage: "Unauthorized request aa" },
          { status: 401 }
        );
      }
      const token = bearerToken.split(" ")[1];
      if (!token) {
        return NextResponse.json(
          { errorMessage: "Unauthorized request bb" },
          { status: 401 }
        );
      }
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      try {
        await jose.jwtVerify(token, secret);
      } catch (error) {
        return NextResponse.json(
          { errorMessage: "Unauthorized request cc" },
          { status: 401 }
        );
      }
    }

    return res;
  };
};
