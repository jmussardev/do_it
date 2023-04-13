import Link from "next/link";

export default function WeekNavBar() {
  return (
    <div className="bg-opacity-0 w-full h-[6rem] overflow-y-hidden  border-b-2 border-black">
      <div className=" justify-evenly -space-x-3 flex  h-full  ## sm:-space-x-1 sm:flex-row sm:w-full sm:justify-evenly">
        <Link href={`/my-week/1`}>
          <div className="ccc flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 border-l-2 border-b-2 border-r-2 border-black rounded-b-md bg-white font-bold ## hover:-translate-y-1  hover:bg-black hover:text-white ## sm:w-[5rem] sm:h-[6rem] ">
            M
          </div>
        </Link>
        <Link href={`/my-week/2`}>
          <div className="ccc flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 border-l-2 border-b-2 border-r-2 border-black rounded-b-md bg-white font-bold ## hover:-translate-y-1  hover:bg-black hover:text-white ## sm:w-[5rem] sm:h-[6rem] ">
            T
          </div>
        </Link>
        <Link href={`/my-week/3`}>
          <div className="ccc flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 border-l-2 border-b-2 border-r-2 border-black rounded-b-md bg-white font-bold ## hover:-translate-y-1  hover:bg-black hover:text-white ## sm:w-[5rem] sm:h-[6rem] ">
            W
          </div>
        </Link>
        <Link href={`/my-week/4`}>
          <div className="ccc flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 border-l-2 border-b-2 border-r-2 border-black rounded-b-md bg-white font-bold ## hover:-translate-y-1  hover:bg-black hover:text-white ## sm:w-[5rem] sm:h-[6rem] ">
            T
          </div>
        </Link>
        <Link href={`/my-week/5`}>
          <div className="ccc flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 border-l-2 border-b-2 border-r-2 border-black rounded-b-md bg-white font-bold ## hover:-translate-y-1  hover:bg-black hover:text-white ## sm:w-[5rem] sm:h-[6rem] ">
            F
          </div>
        </Link>
        <Link href={`/my-week/6`}>
          <div className="ccc flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 border-l-2 border-b-2 border-r-2 border-black rounded-b-md bg-white font-bold ## hover:-translate-y-1  hover:bg-black hover:text-white ## sm:w-[5rem] sm:h-[6rem] ">
            S
          </div>
        </Link>
        <Link href={`/my-week/7`}>
          <div className="ccc flex justify-center items-center w-[3.5rem] xsm:w-[7.6rem] h-[6rem] pt-4  -translate-y-4 border-l-2 border-b-2 border-r-2 border-black rounded-b-md bg-white font-bold ## hover:-translate-y-1  hover:bg-black hover:text-white ## sm:w-[5rem] sm:h-[6rem] ">
            S
          </div>
        </Link>
      </div>
    </div>
  );
}
