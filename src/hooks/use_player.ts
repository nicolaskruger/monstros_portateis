import { useCanvas, useControl } from "@/provider/game_provider";
import { useSolid } from "./use_solid";
import { MULTI } from "@/pages";

const multiImage = (img: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width * MULTI;
  canvas.height = img.height * MULTI;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const imgInfo = ctx.getImageData(0, 0, img.width, img.height);
  const resizeData = imgInfo.data
    .reduce(
      (acc, curr) => {
        const [last] = acc.slice(-1);
        if (last.length >= 4) return [...acc, [curr]];
        return [...acc.slice(0, acc.length - 1), [...last, curr]];
      },
      [[]] as number[][]
    )
    .map((datas) =>
      "_"
        .repeat(MULTI)
        .split("")
        .map((_) => datas)
    )
    .flat(2)
    .reduce(
      (acc, curr) => {
        const [last] = acc.slice(-1);
        if (last.length >= img.width * MULTI * 4) return [...acc, [curr]];
        return [...acc.slice(0, acc.length - 1), [...last, curr]];
      },
      [[]] as number[][]
    )
    .map((datas) =>
      "_"
        .repeat(MULTI)
        .split("")
        .map((_) => datas)
    )
    .flat(2);

  console.log({ data: imgInfo.data, resizeData });

  const imgFinal = ctx.getImageData(
    0,
    0,
    img.width * MULTI,
    img.height * MULTI
  );

  const data = imgFinal.data;

  resizeData.forEach((val, i) => (data[i] = val));

  ctx.putImageData(imgFinal, 0, 0);
  const retImage = new Image(img.width * MULTI, img.height * MULTI);

  retImage.src = canvas.toDataURL("image/png");

  return retImage;
};

export const usePlayer = () => {
  const getImg = () => {
    const img = new Image(8, 16);
    img.src = "trevosinha/trevosinha.png";
    return multiImage(img);
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
    const { RIGHT, DOWN, LEFT, UP } = control.control.current;
    if (RIGHT) solid.current.x++;
    if (DOWN) solid.current.y++;
    if (LEFT) solid.current.x--;
    if (UP) solid.current.y--;
  };

  return [tick, render] as const;
};
