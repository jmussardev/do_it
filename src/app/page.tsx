import Auth from "./components/Auth";
import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <div className="layoutSlide flex overflow-hidden flex-col   items-center  h-full w-full ">
      <div className="w-full h-2/6 flex justify-center items-end  ">
        <div className="origin-center  text-right w-[70px] h-fit bg-black text-white font-bold text-3xl --dark-- dark:bg-transparent dark:text-[#E18B15] dark:border-2 dark:border-[#E18B15]">
          <span className="block">DO</span>
          <span className="block pr-[3px] ">.IT</span>
        </div>
      </div>

      <div className="flex justify-center   w-full  h-4/6">
        <Auth />
      </div>
    </div>
  );
}
