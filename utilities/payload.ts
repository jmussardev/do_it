import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { notFound } from "next/navigation";

export const getPayload = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;
  if (token) {
    const payload: any = jwt.decode(token);

    if (!payload.email) {
      notFound();
    }
    return payload.email;
  }
};
