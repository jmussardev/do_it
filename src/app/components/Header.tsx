import NavBar from "./Navbar";

export default function Header() {
  return (
    <>
      <div className=" h-[6rem]   bg-white border-2 border-rose-500 -- sm:static sm:h-full sm:w-1/4 sm:p-6 ">
        <div className="absolute w-full z-50 flex justify-between pb-3 items-center bg-white border border-yellow-400 -- sm:static sm:w-full">
          <div className=" ml-2 mt-2 text-right w-[70px]  bg-gray-300 font-bold text-3xl">
            <span className="block">DO</span>
            <span className="block pr-[3px] ">.IT</span>
          </div>
          <div className="h-12 w-12 mr-2 mt-2 rounded-full bg-purple-400 "></div>
        </div>
        <NavBar />
      </div>
    </>
  );
}

// -translate-x-[254px]
