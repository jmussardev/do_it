import { PRIORITY } from "@prisma/client";

export interface Task {
  id: number;
  description: string;
  priority: PRIORITY;
  week: number;
  user_id: number;
  timer: number;
  iscompleted: boolean;
  date: string;
}
