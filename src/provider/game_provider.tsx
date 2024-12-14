import { useGameLoop } from "@/hooks/use_game_loop";
import {
  createContext,
  FC,
  KeyboardEvent,
  ReactNode,
  RefObject,
  useContext,
  useRef,
} from "react";

export type GameContextType = {
  canvas: RefObject<HTMLCanvasElement | null>;
  control: RefObject<ControlState>;
  player: RefObject<number>;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyUp: (e: KeyboardEvent<HTMLElement>) => void;
};

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

type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

type ControlState = EnumDictionary<ControlKeys, boolean>;

const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const control = useRef<ControlState>({} as ControlState);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    control.current[keyboardToControl[e.key]] = true;
  };

  const onKeyUp = (e: KeyboardEvent<HTMLElement>) => {
    control.current[keyboardToControl[e.key]] = false;
  };

  const x = useRef<number>(0);
  const y = useRef<number>(0);
  const render = () => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d")!;
    ctx.fillStyle = "red";
    ctx.fillRect(x.current, y.current, 40, 40);
  };
  const tick = () => {
    const { RIGHT, DOWN } = control.current;
    if (RIGHT) x.current++;
    if (DOWN) y.current++;
  };

  useGameLoop(tick, render);

  return (
    <GameContext.Provider
      value={{ player: x, control, onKeyDown, onKeyUp, canvas }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
