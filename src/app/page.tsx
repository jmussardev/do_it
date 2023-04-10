import Tasks from "./components/Tasks";

export default function Home() {
  return (
    <div className=" h-full cardpattern sm:bg-white">
      {/* //header// */}
      <div className="w-full  h-fit  pb-5 flex justify-center border-black border-b-2">
        <div className="w-[8rem] h-[5rem] rounded-b-md bg-black -- text-white font-bold flex flex-col justify-center items-center">
          <p>Friday</p>
          <p>04/07</p>
        </div>
      </div>
      {/* //header// */}

      {/* //tasks// */}
      <div className=" h-5/6 overflow-auto  ">
        <Tasks />
      </div>
      {/* //tasks// */}
    </div>
  );
}
