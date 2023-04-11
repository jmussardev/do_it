import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TaskType } from "../page";
import { PRIORITY } from "@prisma/client";

import Image, { StaticImageData } from "next/image";
import delIcon from "./../../../public/icons/delete.png";
import pencil from "./../../../public/icons/pencil.png";
import check from "./../../../public/icons/check.png";
import chrono from "./../../../public/icons/chrono.png";
import play from "./../../../public/icons/play.png";
import p1 from "./../../../public/icons/p1.png";
import p2 from "./../../..//public/icons/p2.png";
import p3 from "./../../../public/icons/p3.png";

interface InputsType {
  description: string;
  priority: string;
  timer: string;
}

export default function TaskCardInput({
  task,
  edit,
  setEdit,

  handleChangeInput,
  inputs,
  switchPriorityInput,
}: {
  task: TaskType;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;

  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  inputs: InputsType;
  switchPriorityInput: () => void;
}) {
  function switchPriority() {
    switch (inputs.priority) {
      case PRIORITY.ONE:
        return p1;
      case PRIORITY.TWO:
        return p2;
      case PRIORITY.THREE:
        return p3;

      default:
        return p1;
    }
  }

  return <></>;
}
