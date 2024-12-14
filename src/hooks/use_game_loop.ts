import { FPS } from "@/constant/game";
import { useEffect, useRef } from "react";

export const useGameLoop = (tick: () => void, render: () => void) => {
  const gamePace = useRef<NodeJS.Timeout>(null);

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
