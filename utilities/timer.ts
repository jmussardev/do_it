import { Dispatch, SetStateAction } from "react";

export default function timer(
  value: number,
  setDiplayTime: Dispatch<SetStateAction<string>>,
  start: boolean,
  setRemainingTime: Dispatch<SetStateAction<number>>,
  setStopTimer: Dispatch<SetStateAction<boolean>>
) {
  let count = value;
  let time = "";

  const subTime = () => {
    let minutes: number | string = Math.floor(count / 60);
    let secondes: number | string = count % 60;

    if (count === 0) setStopTimer(true);
    if (count >= 0) {
      minutes = minutes.toString();
      secondes = secondes.toString();
      minutes = parseInt(minutes, 10) < 10 ? "0" + minutes : minutes;
      secondes = parseInt(secondes, 10) < 10 ? "0" + secondes : secondes;
      time = `${minutes} : ${secondes}`;
      count--;
      displayCount();
    }
  };

  const displayCount = () => {
    setDiplayTime(time);
    setRemainingTime(count);
  };

  return { subTime };
}
