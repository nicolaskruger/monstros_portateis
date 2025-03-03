import { FC, useEffect, useRef } from "react";

const rgb = (r: number, g: number, b: number) => `rgb(${r}, ${g}, ${b})`;

const pixW = 8;
const pixH = 8;
const lightGray = rgb(169, 169, 169);
const darkGray = rgb(105, 105, 105);
const onePix = 1;

const matrixGen = (w: number, h: number) => {
  const matrix: [number, number][] = [];
  for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) matrix.push([i, j]);
  return matrix;
};

const PixMaker: FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const getCtx = () => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) throw { error: "Canvas not found" };
    return ctx;
  };

  const chessPattern = () => {
    const ctx = getCtx();

    const pattern = [lightGray, darkGray];

    matrixGen(pixW, pixH).forEach(([i, j]) => {
      ctx.fillStyle = `${pattern[(i + j) % 2]}`;
      ctx.fillRect(j, i, onePix, onePix);
    });
  };

  useEffect(() => {
    chessPattern();
  }, []);

  return (
    <div w-screen h-screen>
      <h1>Pix Maker</h1>
      <main>
        <canvas width={pixW} height={pixH} ref={canvas} id="pix-maker" />
      </main>
    </div>
  );
};

export default PixMaker;
