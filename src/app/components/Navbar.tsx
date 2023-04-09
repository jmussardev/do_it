import Link from "next/link";

export default function NavBar() {
  return (
    <div className=" w-full font-bold text-lg text-center bg-green-400 -- sm:static sm:text-left ">
      <ul className=" sm:border-black border-t-[3px] mb-10 pt-4">
        <li>
          <Link href={"/"}>Today</Link>
        </li>
        <li>
          <Link href={"/my-week"}> My week</Link>
        </li>
        <li>
          <Link href={"/archived"}> Archived</Link>
        </li>
        <li>
          <Link href={"/settings"}> Settings</Link>
        </li>
      </ul>
      <div className="pt-4 mb-5 border-black border-t-[3px]  ">
        <ul>
          <li>
            <button>Dark mode</button>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
