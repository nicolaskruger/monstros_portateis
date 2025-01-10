import { ControlType, useConfigControl } from "@/hooks/use_config_control";
import { MULTI } from "@/pages";
import {
  createContext,
  FC,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
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

export const useScreen = () => {
  const ctx = useRef<CanvasRenderingContext2D>(null);
  const canvas = useCanvas();

  useEffect(() => {
    ctx.current = canvas.current!.getContext("2d")!;
  }, [canvas]);

  return {
    canvas,
    ctx,
    putImageDataRoot: (img: ImageData) => {
      ctx.current?.putImageData(img, 0, 0);
    },
    drawImage: (img: HTMLImageElement, dx: number, dy: number) =>
      ctx.current?.drawImage(img, dx, dy),
    toDataUrl: () => canvas.current!.toDataURL("image/png"),
    getFullScreen: () =>
      ctx.current!.getImageData(
        0,
        0,
        canvas.current!.width * MULTI,
        canvas.current!.height * MULTI
      ),
  };
};

export const useControl = () => useGame().control;
