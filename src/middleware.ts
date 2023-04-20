import { NextResponse } from "next/server";
import { withAuthorization } from "../middlewares/withAuthorization";

export function defaultMiddleware() {
  return NextResponse.next();
}

export default withAuthorization(defaultMiddleware);
export const config = {
  matcher: ["/user/:path*"],
};
