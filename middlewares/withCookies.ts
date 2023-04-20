import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";
import { getCookie } from "cookies-next";

export const withCookie: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);

    // const jwt = request.cookies.get("jwt")?.value;

    // console.log("#########");
    // console.log(jwt);
    // console.log("#########");

    // if (!request.cookies.has("jwt")) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    return res;
  };
};
