import { FPS } from "@/constant/game";
import { useEffect, useRef } from "react";
import { usePlayer } from "./use_player";

export const useGameLoop = () => {
  const gamePace = useRef<NodeJS.Timeout>(null);

  const [tickPlayer, renderPlayer] = usePlayer();

  const render = () => {
    renderPlayer();
  };
  const tick = () => {
    tickPlayer();
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
