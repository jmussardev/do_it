/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import tuto from "./../img/tuto-week.gif";
import BtnTuto from "./BtnTuto";

export default function TutoMyWeek({ payload }: { payload: string }) {
  return (
    <div className="absolute top-0 px-5 py-5 z-30 text-black h-full w-full bg-gray-300 bg-opacity-60 ">
      <div className="overflow-y-auto h-full w-full flex flex-col  items-center p-4 text-center text-lg font-bold bg-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.3)]  rounded-lg">
        {" "}
        <div className="border-b-2 border-black mb-2">
          {" "}
          <p>🗓️Here you can plan your week🖋️</p>
          <p>✨Day by day !✨</p>
        </div>
        <Image className="mt-2 mb-6" src={tuto} alt="" />
        <BtnTuto payload={payload} text="HumHum Ok!" tuto="myweek" />
      </div>
    </div>
  );
}
