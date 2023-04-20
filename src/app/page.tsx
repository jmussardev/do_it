import Auth from "./components/Auth";

export default function Home() {
  return (
    <div className="layoutSlide flex overflow-hidden flex-col   items-center  h-full w-full">
      <div className="w-full h-2/6 flex justify-center items-end  ">
        <div className="origin-center  text-right w-[70px] h-fit bg-black text-white font-bold text-3xl">
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
