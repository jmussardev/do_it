import Tasks from "./components/Tasks";

export default function Home() {
  return (
    <div className=" h-full">
      {/* //header// */}
      <div className="w-full h-1/6 flex justify-center ">
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
