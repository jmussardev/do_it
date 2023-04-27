import Week from "../../../components/Week";
import { getPayload } from "../../../../../utilities/payload";
import { getTasks } from "../../../../../utilities/getTasks";
import { notFound } from "next/navigation";
import TutoMyWeek from "@/app/components/TutoMyWeek";
const { getByWeek, areTutosDone } = getTasks();
export const metadata = {
  title: "My week",
};

export default async function MyWeek({ params }: { params: { day: string } }) {
  const payload = getPayload();
  if (!payload) {
    notFound();
  }
  const tasks = await getByWeek(payload);
  if (!tasks) {
    notFound();
  }
  const res = await areTutosDone(payload);

  return (
    <div className="relative h-full w-full">
      {!res?.myweek && <TutoMyWeek payload={payload} />}

      <Week tasks={tasks} day={params.day} payload={payload} />
    </div>
  );
}
