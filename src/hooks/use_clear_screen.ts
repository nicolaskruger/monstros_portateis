import { useEffect, useRef } from "react";
import { useScreen } from "./use_screen";

export const useClearScreen = () => {
  const { getFullScreen, putImageDataRoot, toDataUrl, drawImage } = useScreen();
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const screen = getFullScreen();
    screen.data.forEach((_, i) =>
      i % 4 == 3 ? (screen.data[i] = 255) : (screen.data[i] = 0)
    );
    putImageDataRoot(screen);
    img.current = new Image();
    img.current.src = toDataUrl();
  }, []);
  return () => {
    drawImage(img.current!, 0, 0);
  };
};
