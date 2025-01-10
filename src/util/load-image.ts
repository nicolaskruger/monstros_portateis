import { MULTI } from "@/pages";

type rgba = [number, number, number, number];

const multiRgba = (pixels: rgba[][]): rgba[][] => {
  const repeat = <T>(p: T) =>
    "_"
      .repeat(MULTI)
      .split("")
      .map((_) => p);
  return pixels.map((pix) => pix.flatMap(repeat)).flatMap(repeat);
};

const dataToMatrix = ({ data, width }: ImageData): rgba[][] => {
  const groupByLength =
    (length: number) =>
    <T>(acc: T[][], curr: T) => {
      const [last] = acc.slice(-1);
      if (last.length >= length) return [...acc, [curr]];
      return [...acc.slice(0, acc.length - 1), [...last, curr]];
    };
  return data
    .reduce(groupByLength(4), [[]] as number[][])
    .reduce(groupByLength(width), [[]] as number[][][]) as rgba[][];
};

export const loadImage = (src: string, width: number, height: number) => {
  const img = new Image(width, height);
  img.src = src;
  const genFinalImg = () => {
    const finalImg = new Image(img.width * MULTI, img.height * MULTI);

    finalImg.src = canvas.toDataURL("image/png");
    return finalImg;
  };
  const generateCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width * MULTI;
    canvas.height = img.height * MULTI;
    return canvas;
  };
  const canvas = generateCanvas();
  const generateContext = () => {
    const ctx = canvas.getContext("2d")!;
    return {
      ctx,
      drawImage: () => ctx.drawImage(img, 0, 0),
      getImageData: () => ctx.getImageData(0, 0, img.width, img.height),
      getFullImageData: () =>
        ctx.getImageData(0, 0, img.width * MULTI, img.height * MULTI),
      putImageData: (img: ImageData) => ctx.putImageData(img, 0, 0),
    };
  };
  const ctx = generateContext();
  ctx.drawImage();
  const finalImgData = ctx.getFullImageData();

  multiRgba(dataToMatrix(ctx.getImageData()))
    .flat(2)
    .forEach((val, i) => (finalImgData.data[i] = val));

  ctx.putImageData(finalImgData);

  return genFinalImg();
};
