import { NextFetchEvent, NextRequest } from "next/server";
import { MiddlewareFactory } from "./types";
export const withLogging: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);

    return next(request, _next);
  };
};
