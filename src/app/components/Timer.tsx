"use client";

import { ChronoContext } from "@/app/context/ChronoContext";
import { useContext, useEffect, useRef, useState } from "react";
import timer from "../../../utilities/timer";

const useTimer = (callback: (...args: any) => void) => {
  const timerRef = useRef<any>();

  const onTimer = (...args: any[]) => {
    clearTimeout(timerRef.current);

    return (timerRef.current = setInterval(() => {
      callback(...args);
    }, 1000));
  };

  return onTimer;
};

export default function Timer() {
  const { setTimerState, start, value, end, isPaused, task_id } =
    useContext(ChronoContext);
  const [displayTime, setDisplayTime] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);
  const { subTime } = timer(
    value,
    setDisplayTime,
    start,
    setRemainingTime,
    setStopTimer
  );
  let timerRef = useRef<any>();
  const onTimer = useTimer(subTime);

  useEffect(() => {
    if (stopTimer) {
      console.log("timer stopped");
      setTimerState({
        task_id: null,
        value: 0,
        start: false,
        end: true,
        isPaused: false,
      });
    }
  }, [stopTimer, setTimerState]);

  useEffect(() => {
    if (isPaused === true) {
      const newValue = remainingTime;
      setTimerState({
        task_id: task_id,
        value: newValue,
        end: false,
        start: false,
        isPaused: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, setTimerState]);

  useEffect(() => {
    if (start == false) {
      console.log(timerRef.current);
      clearInterval(timerRef.current);
    }
    if (start && value !== 0) {
      clearInterval(timerRef.current);

      const timerId = onTimer();
      timerRef.current = timerId;
      console.log(timerRef.current);
      //   clearInterval(timerRef.current);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  return <div>{displayTime}</div>;
}
