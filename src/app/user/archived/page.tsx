import { notFound } from "next/navigation";
import getDate from "../../../../utilities/date";
import { getTasks } from "../../../../utilities/getTasks";
import { getPayload } from "../../../../utilities/payload";
import ArchivedLink from "../../components/ArchivedLink";
const { dayOfWeek } = getDate();
const { getOldWeeks } = getTasks();

export default async function Archived() {
  const payload = getPayload();
  if (!payload) {
    notFound();
  }
  const oldTasks = await getOldWeeks(payload);
  if (!oldTasks) {
    notFound();
  }

  let oldWeeks: number[] = [];
  oldTasks.forEach((task) => {
    oldWeeks.push(task.week);
  });
  const uniqSet = new Set(oldWeeks);
  const uniq = [...uniqSet];
  console.log(uniq);

  return (
    <div className="flex flex-col h-full w-full p-10 items-center justify-center overflow-y-auto  ">
      <ul className="w-full text-center font-bold text-lg">
        {uniq.map((week, i) => (
          <li key={i} className="w-full mb-3">
            <ArchivedLink
              week={week}
              date1={dayOfWeek("1", week.toString())}
              date2={dayOfWeek("7", week.toString())}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
