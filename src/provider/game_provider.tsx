import { ControlType, useConfigControl } from "@/hooks/use_config_control";
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

  return (
    <GameContext.Provider value={{ player: x, control, canvas }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

export const useCanvas = () => useGame().canvas!;

export const useControl = () => useGame().control;
