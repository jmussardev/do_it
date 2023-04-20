import Week from "../../../components/Week";
import { getPayload } from "../../../../../utilities/payload";
import { getTasks } from "../../../../../utilities/getTasks";
import { notFound } from "next/navigation";
const { getByWeek } = getTasks();

export default async function MyWeek({ params }: { params: { day: string } }) {
  const payload = getPayload();
  if (!payload) {
    notFound();
  }
  const tasks = await getByWeek(payload);
  if (!tasks) {
    notFound();
  }

  return (
    <>
      <Week tasks={tasks} day={params.day} />
    </>
  );
}
