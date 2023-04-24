import Image, { StaticImageData } from "next/image";
import p1 from "./../../../public/icons/p1.png";
import p2 from "./../../..//public/icons/p2.png";
import p3 from "./../../../public/icons/p3.png";

import { Dispatch, SetStateAction } from "react";
import { PRIORITY } from "@prisma/client";

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
  function switchPriorityInput() {
    switch (inputs.priority) {
      case PRIORITY.ONE:
        return (
          setInputs({
            ...inputs,
            priority: PRIORITY.TWO,
          }),
          setPriorityIcon(p2)
        );
      case PRIORITY.TWO:
        return (
          setInputs({
            ...inputs,
            priority: PRIORITY.THREE,
          }),
          setPriorityIcon(p3)
        );
      case PRIORITY.THREE:
        return (
          setInputs({
            ...inputs,
            priority: PRIORITY.ONE,
          }),
          setPriorityIcon(p1)
        );

      default:
        break;
    }
  }

  const setInitialIcon = (priority: string) => {
    if (priority === "ONE") {
      return p1;
    } else if (priority === "TWO") {
      return p2;
    } else if (priority === "THREE") {
      return p3;
    } else {
      return p1;
    }
  };

  return (
    <div className="w-7 pr-1 flex items-center border-r-2  ">
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
