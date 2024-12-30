import { MULTI } from "@/pages";
import { useRef } from "react";

type Solid = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const useSolid = (init?: Solid) => {
  const solid = useRef<Solid>(init || { x: 0, y: 0, height: 0, width: 0 });
  const getX = () => solid.current.x * MULTI;
  const getY = () => solid.current.y * MULTI;
  const getWith = () => solid.current.width * MULTI;
  const getHeight = () => solid.current.height * MULTI;
  return { solid, getX, getY, getWith, getHeight };
};
