import Image, { StaticImageData } from "next/image";
import p1 from "./../../../public/icons/p1.png";
import p2 from "./../../..//public/icons/p2.png";
import p3 from "./../../../public/icons/p3.png";
import p1_dark from "./../../../public/icons/p1-dark.png";
import p2_dark from "./../../..//public/icons/p2-dark.png";
import p3_dark from "./../../../public/icons/p3-dark.png";

import { Dispatch, SetStateAction } from "react";
import { PRIORITY } from "@prisma/client";
import { useTheme } from "next-themes";

interface Inputs {
  id: number;
  description: string;
  priority: string;
  timer: number;
  iscompleted: boolean;
}

export default function OptionPriority({
  priorityIcon,
  setPriorityIcon,
  inputs,
  setInputs,
  isOld,
  isArchived,
}: {
  priorityIcon: StaticImageData | undefined;
  setPriorityIcon: Dispatch<SetStateAction<StaticImageData | undefined>>;
  inputs: Inputs;
  setInputs: any;
  isOld?: boolean;
  isArchived?: boolean;
}) {
  const { theme } = useTheme();

  function switchPriorityInput() {
    switch (inputs.priority) {
      case PRIORITY.ONE:
        return (
          setInputs({
            ...inputs,
            priority: PRIORITY.TWO,
          }),
          setPriorityIcon(theme === "dark" ? p2_dark : p2)
        );
      case PRIORITY.TWO:
        return (
          setInputs({
            ...inputs,
            priority: PRIORITY.THREE,
          }),
          setPriorityIcon(theme === "dark" ? p3_dark : p3)
        );
      case PRIORITY.THREE:
        return (
          setInputs({
            ...inputs,
            priority: PRIORITY.ONE,
          }),
          setPriorityIcon(theme === "dark" ? p1_dark : p1)
        );

      default:
        break;
    }
  }

  const setInitialIcon = (priority: string) => {
    if (priority === "ONE") {
      const p = theme === "dark" ? p1_dark : p1;
      return p;
    } else if (priority === "TWO") {
      const p = theme === "dark" ? p2_dark : p2;
      return p;
    } else if (priority === "THREE") {
      const p = theme === "dark" ? p3_dark : p3;
      return p;
    } else {
      const p = theme === "dark" ? p1_dark : p1;
      return p1;
    }
  };

  return (
    <div className="w-7 pr-1 flex items-center border-r-2 --dark--  dark:border-r-[#E18B15] ">
      <button
        title="priority"
        disabled={isOld || isArchived ? true : false}
        className={`w-5 h-5 ${isOld || isArchived ? "" : "hover:scale-125"} `}
        onClick={() => {
          switchPriorityInput();
        }}
      >
        <Image
          src={priorityIcon ? priorityIcon : setInitialIcon(inputs.priority)}
          alt="priority"
        />
      </button>
    </div>
  );
}
