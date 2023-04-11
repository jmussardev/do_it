"use client";
import { useState, createContext, Dispatch, SetStateAction } from "react";

interface State {
  value: number;
  start: boolean;
  end: boolean | null;
  current: string;
}

interface TimerState extends State {
  setTimerState: Dispatch<SetStateAction<State>>;
}

export const ChronoContext = createContext<TimerState>({
  value: 0,
  start: false,
  end: null,
  current: "",
  setTimerState: () => {},
});

export default function TimerContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [timerState, setTimerState] = useState<State>({
    value: 0,
    start: false,
    end: null,
    current: "",
  });

  return (
    <ChronoContext.Provider value={{ ...timerState, setTimerState }}>
      {children}
    </ChronoContext.Provider>
  );
}
