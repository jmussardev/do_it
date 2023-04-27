import Image from "next/image";
import checkBlack from "./../../../public/icons/checkBlack.png";
import cross_rounded from "./../../../public/icons/cross_rounded.png";
import dash from "./../../../public/icons/dash.png";
import check_dark from "./../../../public/icons/done-dark.png";
import cross_dark from "./../../../public/icons/cross-dark.png";
import dash_dark from "./../../../public/icons/dash-dark.png";
import { counter, displayCount } from "./../../../utilities/counter";
import { Dispatch, SetStateAction } from "react";
import useStateCallback from "../../../hooks/useStateCallback";
import { useTheme } from "next-themes";

interface Inputs {
  id: number;
  description: string;
  priority: string;
  timer: number;
  iscompleted: boolean;
}

export default function Chrono({
  inputs,
  setInputs,
  setIsChronoOpen,
  handleUpdate,
  setIsOverlayOpen,
}: {
  inputs: Inputs;
  setInputs: any;
  setIsChronoOpen: Dispatch<SetStateAction<boolean>>;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
  handleUpdate: () => void;
}) {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div className="absolute z-10 flex  items-center rounded-lg w-full h-full top-0 left-0 bg-gray-100 dark:bg-[#3A405F] bg-opacity-60">
      <div className=" w-1/4 h-full p-4 flex flex-col justify-between items-center ">
        <button
          className={`w-6 h-6 dark:h-4 dark:w-4 hover:scale-125`}
          onClick={() => {
            setInputs({
              ...inputs,
              timer: counter(inputs.timer, "res"),
            });
          }}
        >
          {currentTheme === "dark" ? (
            <Image src={cross_dark} alt="" />
          ) : (
            <Image src={cross_rounded} alt="" />
          )}
        </button>
        <button
          className={`w-6 h-6  hover:scale-125`}
          onClick={() => {
            handleUpdate();
            setIsChronoOpen(false);
            setIsOverlayOpen(false);
          }}
        >
          {currentTheme === "dark" ? (
            <Image src={check_dark} alt="" />
          ) : (
            <Image src={checkBlack} alt="" />
          )}
        </button>
      </div>
      <div className="flex-2 font-bold text-3xl text-center  w-2/4">
        {displayCount(inputs.timer)}
      </div>
      <div className="w-1/4 h-full p-4 flex flex-col items-center justify-between  ">
        <button
          className={`rotate-45 w-5 h-5 dark:h-3.5 dark:w-3.5 hover:scale-125`}
          onClick={() => {
            setInputs({
              ...inputs,
              timer: counter(inputs.timer, "add"),
            });
          }}
        >
          {currentTheme === "dark" ? (
            <Image src={cross_dark} alt="" />
          ) : (
            <Image src={cross_rounded} alt="" />
          )}
        </button>
        <button
          className={`w-5 h-5 dark:h-4 dark:w-4 hover:scale-125`}
          onClick={() => {
            setInputs({
              ...inputs,
              timer: counter(inputs.timer, "sub"),
            });
          }}
        >
          {currentTheme === "dark" ? (
            <Image src={dash_dark} alt="" />
          ) : (
            <Image src={dash} alt="" />
          )}
        </button>
      </div>
    </div>
  );
}
