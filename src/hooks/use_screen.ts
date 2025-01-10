import { MULTI } from "@/pages";
import { useCanvas } from "@/provider/game_provider";
import { useEffect, useRef } from "react";

export const useScreen = () => {
  const ctx = useRef<CanvasRenderingContext2D>(null);
  const canvas = useCanvas();

  useEffect(() => {
    ctx.current = canvas.current!.getContext("2d")!;
  }, [canvas]);

  return {
    canvas,
    ctx,
    putImageDataRoot: (img: ImageData) => {
      ctx.current?.putImageData(img, 0, 0);
    },
    drawImage: (img: HTMLImageElement, dx: number, dy: number) =>
      ctx.current?.drawImage(img, dx, dy),
    toDataUrl: () => canvas.current!.toDataURL("image/png"),
    getFullScreen: () =>
      ctx.current!.getImageData(
        0,
        0,
        canvas.current!.width * MULTI,
        canvas.current!.height * MULTI
      ),
  };
};
