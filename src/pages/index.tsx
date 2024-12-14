import { useEffect, useRef } from "react";

const MULTI = 3;
const SIZE = 8 * 32;
const FPS = 60;

const calcSize = () => MULTI * SIZE;

export default function Home() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const gamePace = useRef<NodeJS.Timeout>(null);
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

  useEffect(() => {
    const gameLoop = () => {
      const start = performance.now();
      tick();
      render();
      gamePace.current = setTimeout(
        gameLoop,
        1000 / FPS - (performance.now() - start)
      );
    };
    gameLoop();
    return () => {
      if (gamePace.current) clearTimeout(gamePace.current);
    };
  }, []);

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
