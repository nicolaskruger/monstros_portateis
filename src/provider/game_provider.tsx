import { ControlType, useConfigControl } from "@/hooks/use_config_control";
import { useGameLoop } from "@/hooks/use_game_loop";
import {
  createContext,
  FC,
  ReactNode,
  RefObject,
  useContext,
  useRef,
} from "react";

export type GameContextType = {
  canvas: RefObject<HTMLCanvasElement | null>;
  control: ControlType;
  player: RefObject<number>;
};

const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const control = useConfigControl();

  const x = useRef<number>(0);
  const y = useRef<number>(0);
  const render = () => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d")!;
    ctx.fillStyle = "red";
    ctx.fillRect(x.current, y.current, 40, 40);
  };
  const tick = () => {
    const { RIGHT, DOWN, LEFT, UP } = control.control.current;
    if (RIGHT) x.current++;
    if (DOWN) y.current++;
    if (LEFT) x.current--;
    if (UP) y.current--;
  };

  useGameLoop(tick, render);

  return (
    <GameContext.Provider value={{ player: x, control, canvas }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

export const useControl = () => useGame().control;
