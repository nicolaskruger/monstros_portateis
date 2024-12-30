import { useCanvas, useControl } from "@/provider/game_provider";
import { useSolid } from "./use_solid";

export const usePlayer = () => {
  const { getX, getY, getWith, getHeight, solid } = useSolid({
    x: 0,
    y: 0,
    height: 8,
    width: 8,
  });
  const canvas = useCanvas();
  const control = useControl();
  const render = () => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d")!;
    ctx.fillStyle = "red";
    ctx.fillRect(getX(), getY(), getWith(), getHeight());
  };
  const tick = () => {
    const { RIGHT, DOWN, LEFT, UP } = control.control.current;
    if (RIGHT) solid.current.x++;
    if (DOWN) solid.current.y++;
    if (LEFT) solid.current.x--;
    if (UP) solid.current.y--;
  };

  return [tick, render] as const;
};
