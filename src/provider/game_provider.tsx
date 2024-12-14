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
  control: RefObject<boolean>;
  player: RefObject<number>;
};

const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const control = useRef<boolean>(false);
  const player = useRef<number>(0);

  const render = () => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d")!;
    ctx.fillStyle = "red";
    ctx.fillRect(player.current, 30, 40, 40);
  };
  const tick = () => {
    if (control.current) player.current++;
  };

  useGameLoop(tick, render);

  return (
    <GameContext.Provider value={{ player, control, canvas }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
