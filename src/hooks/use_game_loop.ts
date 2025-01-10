import { FPS } from "@/constant/game";
import { useEffect, useRef } from "react";
import { usePlayer } from "./use_player";
import { useClearScreen } from "./use_clear_screen";

export const useGameLoop = () => {
  const gamePace = useRef<NodeJS.Timeout>(null);
  const clear = useClearScreen();
  const [tickPlayer, renderPlayer] = usePlayer();

  const render = () => {
    clear();
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
