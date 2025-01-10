import { useCanvas, useControl } from "@/provider/game_provider";
import { useSolid } from "./use_solid";
import { loadImage } from "@/util/load-image";
import { ControlState, EnumDictionary } from "./use_config_control";

const controlAngle = (control: ControlState) => {
  const genKey = ({ DOWN, RIGHT, LEFT, UP }: Partial<ControlState>) =>
    [RIGHT, UP, LEFT, DOWN].map((v) => !!v).join(":");
  const dic: EnumDictionary<string, number> = {
    [genKey({ RIGHT: true })]: 0,
    [genKey({ RIGHT: true, UP: true })]: Math.PI / 4,
    [genKey({ UP: true })]: Math.PI / 2,
    [genKey({ UP: true, LEFT: true })]: (3 * Math.PI) / 4,
    [genKey({ LEFT: true })]: Math.PI,
    [genKey({ LEFT: true, DOWN: true })]: (5 * Math.PI) / 4,
    [genKey({ DOWN: true })]: (3 * Math.PI) / 2,
    [genKey({ DOWN: true, RIGHT: true })]: (7 * Math.PI) / 4,
  };
  const angle = dic[genKey(control)];
  if (angle === undefined) throw "no angle";
  return angle;
};

export const usePlayer = () => {
  const getImg = () => {
    return loadImage("trevosinha/trevosinha.png", 8, 16);
  };
  const { getX, getY, solid } = useSolid({
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
    ctx.drawImage(getImg(), getX(), getY());
  };
  const tick = () => {
    try {
      const angle = controlAngle(control.control.current);
      solid.current.x += Math.cos(angle);
      solid.current.y -= Math.sin(angle);
    } catch (error) {}
  };

  return [tick, render] as const;
};
