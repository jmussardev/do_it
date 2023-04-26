import Tasks from "./../../components/Tasks";
import TodayHeader from "./../../components/TodayHeader";
import { getPayload } from "../../../../utilities/payload";
import { getTasks } from "../../../../utilities/getTasks";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Today",
};

const { getAll } = getTasks();

export default async function Home() {
  const payload: any = getPayload();

  if (!payload) {
    notFound();
  }
  const tasks = await getAll(payload);
  if (!tasks) {
    notFound();
  }

  return (
    <div className=" h-full cardpattern shadow-inner  --dark-- dark:bg-[#3A405F]  ">
      {/* //header// */}
      <TodayHeader />
      {/* //header// */}

      {/* //tasks// */}
      <div className=" h-5/6 overflow-auto  ">
        <Tasks payload={payload} />
      </div>
      {/* //tasks// */}
    </div>
  );
}
