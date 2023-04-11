import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import validator from "validator";
const dayjs = require("dayjs");
const isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(isoWeek);
const today = dayjs().format("dddd-YYYY-MM-DD");
const t = dayjs().format("YYYY-MM-DD");
const week = dayjs(t).isoWeek();

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { description, priority, timer, iscompleted } = await req.json();
  let includePosts: boolean = false;
  let task: Prisma.TaskCreateInput;
  let user: Prisma.UserUncheckedCreateInput;

  user = {
    id: 1,
    first_name: "Jeffrey",
    last_name: "Mussard",
    email: "z2pik666@gmail.com",
    password: "Otome69666!",
    tasks: {
      create: {
        description: description,
        priority,
        timer,
        iscompleted,
        date: today,
        week: week,
      },
    },
  };

  const createUser = await prisma.user.create({ data: user });
}
