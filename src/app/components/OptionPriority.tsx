import Image, { StaticImageData } from "next/image";
import delIcon from "./../../../public/icons/delete.png";
import p1 from "./../../../public/icons/p1.png";
import p2 from "./../../..//public/icons/p2.png";
import p3 from "./../../../public/icons/p3.png";

import { Dispatch, SetStateAction } from "react";
import { PRIORITY } from "@prisma/client";

interface Inputs {
  description: string;
  priority: string;
  timer: number;
  iscompleted: boolean;
}

export default function OptionPriority({
  priorityIcon,
  setPriorityIcon,
  edit,
  inputs,
  setInputs,
}: {
  priorityIcon: StaticImageData;
  setPriorityIcon: Dispatch<SetStateAction<StaticImageData>>;
  edit: Boolean;
  inputs: Inputs;
  setInputs: Dispatch<SetStateAction<Inputs>>;
}) {
  function switchPriorityInput() {
    if (priorityIcon !== undefined) {
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
  }
  return (
    <div className="w-1/5 flex flex-col justify-between ">
      <div className="flex justify-end ">
        <button
          className="w-5 h-5 hover:scale-125"
          onClick={() => {
            switchPriorityInput();
          }}
        >
          <Image src={priorityIcon} alt="priority" />
        </button>
      </div>
      <div className="flex justify-end">
        <button
          className="mr-[4px] h-5 hover:scale-125 "
          hidden={edit ? false : true}
        >
          <Image src={delIcon} alt="" />
        </button>
      </div>
    </div>
  );
}
