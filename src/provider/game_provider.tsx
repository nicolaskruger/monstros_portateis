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
};

const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  return (
    <GameContext.Provider value={{ canvas }}>{children}</GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
