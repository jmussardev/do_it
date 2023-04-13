"use client";
import { useState, createContext, Dispatch, SetStateAction } from "react";

interface State {
  task_id: number | null;
  value: number;
  start: boolean;
  end: boolean | null;
  isPaused: boolean;
}

interface TimerState extends State {
  setTimerState: Dispatch<SetStateAction<State>>;
}

export const ChronoContext = createContext<TimerState>({
  task_id: 0,
  value: 0,
  start: false,
  end: null,
  isPaused: false,
  setTimerState: () => {},
});

export default function TimerContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [timerState, setTimerState] = useState<State>({
    task_id: 0,
    value: 0,
    start: false,
    end: null,
    isPaused: false,
  });

  return (
    <ChronoContext.Provider value={{ ...timerState, setTimerState }}>
      {children}
    </ChronoContext.Provider>
  );
}
