import { withLogging } from "./../middlewares/withLogging";
import { NextResponse } from "next/server";
import { withAuthorization } from "../middlewares/withAuthorization";
import { withCookie } from "../middlewares/withCookies";

export function defaultMiddleware() {
  return NextResponse.next();
}

export default withCookie(withAuthorization(defaultMiddleware));
export const config = {
  matcher: ["/user/:path*", "/api/task/:path*"],
};
