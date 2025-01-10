import { useGameLoop } from "@/hooks/use_game_loop";
import { useControl, useGame } from "@/provider/game_provider";

export const MULTI = 5;
const WIDTH = 8 * 32;
const HEIGHT = 8 * 32;
const calcWidth = () => MULTI * WIDTH;
const calcHeight = () => MULTI * HEIGHT;

export default function Home() {
  const { canvas } = useGame();
  const control = useControl();
  useGameLoop();

  return (
    <main
      {...control}
      tabIndex={-1}
      className="w-screen h-screen flex justify-center items-center"
    >
      <canvas
        ref={canvas}
        className="h-full"
        width={calcWidth()}
        height={calcHeight()}
      />
    </main>
  );
}
