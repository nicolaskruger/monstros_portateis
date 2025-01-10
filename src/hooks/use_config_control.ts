import { KeyboardEvent, useRef } from "react";

type ControlKeys =
  | "UP"
  | "DOWN"
  | "LEFT"
  | "RIGHT"
  | "A"
  | "B"
  | "START"
  | "SELECT";

const keyboardToControl: EnumDictionary<string, ControlKeys> = {
  w: "UP",
  a: "LEFT",
  s: "DOWN",
  d: "RIGHT",
  j: "SELECT",
  k: "START",
  l: "A",
  ç: "B",
};

export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export type ControlState = EnumDictionary<ControlKeys, boolean>;

export const useConfigControl = () => {
  const control = useRef<ControlState>({} as ControlState);
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    control.current[keyboardToControl[e.key]] = true;
  };

  const onKeyUp = (e: KeyboardEvent<HTMLElement>) => {
    control.current[keyboardToControl[e.key]] = false;
  };

  return {
    control,
    onKeyDown,
    onKeyUp,
  };
};

export type ControlType = ReturnType<typeof useConfigControl>;
