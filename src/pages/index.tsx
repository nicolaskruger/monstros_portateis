import { useGame } from "@/provider/game_provider";

const MULTI = 3;
const SIZE = 8 * 32;

const calcSize = () => MULTI * SIZE;

export default function Home() {
  const { canvas, onKeyDown, onKeyUp } = useGame();

  return (
    <main
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      tabIndex={-1}
      className="size-full flex justify-center items-center"
    >
      <canvas ref={canvas} width={calcSize()} height={calcSize()} />
    </main>
  );
}
