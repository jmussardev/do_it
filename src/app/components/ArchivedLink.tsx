"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import archive from "./../../../public/icons/archive.png";
import archive_dark from "./../../../public/icons/archived-dark.png";
import { useTheme } from "next-themes";

export default function ArchivedLink({
  week,
  date1,
  date2,
}: {
  week: number;
  date1: string;
  date2: string;
}) {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: "spring" }}
      className="flex items-center justify-center w-full h-[3rem] text-[1rem] text-gray-700 rounded-lg drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)] isOld active:drop-shadow-md  hover:bg-gray-400  --dark-- dark:bg-[#3A405F] dark:text-[#E18B15] dark:hover:bg-[#29304b]"
    >
      <div className="block h-fit w-5 mr-3 ">
        {theme === "dark" ? (
          <Image src={archive_dark} alt="" />
        ) : (
          <Image src={archive} alt="" />
        )}
      </div>{" "}
      <Link href={`user/archived/${week}/1`}>
        Archived tasks from <span className="text-gray-400">{date1}</span> to{" "}
        <span className="text-gray-400">{date2}</span>
      </Link>
    </motion.div>
  );
}
