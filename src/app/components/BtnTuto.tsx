/* eslint-disable react/no-unescaped-entities */
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import getDate from "../../../utilities/date";
const { dayNum } = getDate();

async function setTutosDone({
  payload,
  tuto,
}: {
  payload: string;
  tuto: string;
}) {
  const res = axios.get(`/api/user/${payload}/${tuto}`);
}

export default function BtnTuto({
  text,
  payload,
  tuto,
}: {
  text: string;
  payload: string;
  tuto: string;
}) {
  const router = useRouter();
  return (
    <button
      className="hover:bg-black hover:text-white rounded-lg px-2 p-1 w-fit bg-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.3)] active:drop-shadow-md"
      onClick={async () => {
        await setTutosDone({ payload, tuto });
        // const t = tuto === "myweek" ? `my-week/${dayNum()}` : tuto;
        router.refresh();
      }}
    >
      {text}
    </button>
  );
}
