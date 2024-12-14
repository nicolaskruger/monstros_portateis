import { useGameLoop } from "@/hooks/use_game_loop";
import { useGame } from "@/provider/game_provider";
import { useRef } from "react";

const MULTI = 3;
const SIZE = 8 * 32;

const calcSize = () => MULTI * SIZE;

export default function Home() {
  const { canvas } = useGame();
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
    <main
      onKeyDown={() => (control.current = true)}
      onKeyUp={() => (control.current = false)}
      tabIndex={-1}
      className="size-full flex justify-center items-center"
    >
      <canvas ref={canvas} width={calcSize()} height={calcSize()} />
    </main>
  );
}
