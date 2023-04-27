import Tasks from "./../../components/Tasks";
import TodayHeader from "./../../components/TodayHeader";
import { getPayload } from "../../../../utilities/payload";
import { getTasks } from "../../../../utilities/getTasks";
import { notFound } from "next/navigation";
import TutoToday from "@/app/components/TutoToday";

export const metadata = {
  title: "Today",
};

const { areTutosDone } = getTasks();

export default async function Home() {
  const payload: any = getPayload();

  if (!payload) {
    notFound();
  }

  const res = await areTutosDone(payload);
  if (!res) {
    notFound();
  }

  return (
    <>
      <div className="relative h-full cardpattern shadow-inner  --dark-- dark:bg-[#3A405F]  ">
        {!res?.today && <TutoToday payload={payload} name={res.first_name} />}

        <TodayHeader />

        <div className=" h-5/6 overflow-auto  ">
          <Tasks payload={payload} />
        </div>
      </div>
    </>
  );
}
