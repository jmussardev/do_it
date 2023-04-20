import ArchivedWeek from "@/app/components/ArchivedWeek";
import { getPayload } from "../../../../../../utilities/payload";
import { getTasks } from "../../../../../../utilities/getTasks";
import { notFound } from "next/navigation";

const { getOld } = getTasks();

export default async function Archived() {
  const payload = getPayload();
  if (!payload) {
    notFound();
  }
  const oldTasks = await getOld(payload);
  if (!oldTasks) {
    notFound();
  }

  return <ArchivedWeek oldTasks={oldTasks} payload={payload} />;
}
