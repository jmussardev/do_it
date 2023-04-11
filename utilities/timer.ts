import { Dispatch, SetStateAction } from "react";

export default function timer(
  value: number,
  setDiplayTime: Dispatch<SetStateAction<string>>
) {
  let count = value;
  let time = "";
  //   console.log("startTimer>>>" + value);
  //   console.log("current>>>" + current);

  const subTime = () => {
    // console.log("minutes>>>" + minutes);
    // console.log("secondes>>>" + secondes);

    let minutes: number | string = Math.floor(count / 60);
    let secondes: number | string = count % 60;
    minutes = minutes.toString();
    secondes = secondes.toString();

    minutes = parseInt(minutes, 10) < 10 ? "0" + minutes : minutes;
    secondes = parseInt(secondes, 10) < 10 ? "0" + secondes : secondes;

    time = `${minutes} : ${secondes}`;

    count--;
    displayCount();
    console.log("count>>>>" + count);
    if (count === 0) {
    }
  };

  const startTimer = () => {
    return setInterval(subTime, 1000);
  };

  const displayCount = () => {
    setDiplayTime(time);
  };

  return {
    startTimer,
  };
}
