import { FPS } from "@/constant/game";
import { useCanvas, useControl } from "@/provider/game_provider";
import { useEffect, useRef } from "react";

export const useGameLoop = () => {
  const gamePace = useRef<NodeJS.Timeout>(null);
  const control = useControl();
  const canvas = useCanvas();

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
};
