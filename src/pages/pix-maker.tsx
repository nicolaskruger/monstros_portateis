import { FC, useEffect, useRef, useState } from "react";

const CRAZY_PATTERN_SIZE = 20;

const rgb = (r: number, g: number, b: number) => `rgb(${r}, ${g}, ${b})`;

const PixMaker: FC = () => {
  const [name, setName] = useState("");
  const [sizeX, setSizeX] = useState(8);
  const [sizeY, setSizeY] = useState(8);
  const [actualSizeX, setActualSizeX] = useState(8);
  const [actualSizeY, setActualSizeY] = useState(8);
  const canvas = useRef<HTMLCanvasElement>(null);

  const makeCrazyPattern = () => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      const lightGray = rgb(169, 169, 169);
      const darkGray = rgb(105, 105, 105);

      const pattern = [lightGray, darkGray];

      if (ctx) {
        for (let i = 0; i < CRAZY_PATTERN_SIZE; i++) {
          for (let j = 0; j < CRAZY_PATTERN_SIZE; j++) {
            ctx.fillStyle = `${pattern[(i + j) % 2]}`;
            ctx.fillRect(
              j * CRAZY_PATTERN_SIZE,
              i * CRAZY_PATTERN_SIZE,
              CRAZY_PATTERN_SIZE,
              CRAZY_PATTERN_SIZE
            );
          }
        }
      }
    }
  };

  const resizeCanvas = () => {
    if (canvas.current) {
      const width = canvas.current.width;
      const height = canvas.current.height;
      if (width > height && actualSizeX > actualSizeY) {
      } else if (width < height && actualSizeX > actualSizeY) {
      } else if (width > height && actualSizeX < actualSizeY) {
      } else if (width > height && actualSizeX < actualSizeY) {
      }
    }
  };
  useEffect(() => {
    resizeCanvas();
    makeCrazyPattern();
  }, []);

  const FormAction = () => {
    return (
      <aside className="flex flex-col space-y-4">
        <form className="flex space-x-2 items-center" action="submit">
          <span>name</span>
          <input
            className="p-1 text-slate-950"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
          />

          <button className="bg-green-500 p-1 " type="submit">
            save
          </button>
        </form>
        <form className="flex space-x-2 items-center">
          <span>size x</span>
          <input
            className="p-1 text-slate-950"
            value={sizeX}
            onChange={(e) => setSizeX(Number(e.target.value))}
            type="text"
            name="name"
          />
          <span>size y</span>
          <input
            className="p-1 text-slate-950"
            value={sizeY}
            onChange={(e) => setSizeY(Number(e.target.value))}
            type="text"
            name="name"
          />
          <button
            className="bg-green-500 p-1 "
            onClick={() => {
              setActualSizeX(sizeX);
              setActualSizeY(sizeY);
            }}
          >
            confirm
          </button>
          <button
            className="bg-red-500 p-1 "
            onClick={() => {
              setSizeX(actualSizeX);
              setSizeY(actualSizeY);
            }}
          >
            cancel
          </button>
        </form>
      </aside>
    );
  };

  return (
    <div w-screen h-screen>
      <h1>Pix Maker</h1>
      <main className="flex flex-col space-y-2">
        <FormAction />
        <canvas ref={canvas} id="pix-maker" className="size-full" />
      </main>
    </div>
  );
};

export default PixMaker;
