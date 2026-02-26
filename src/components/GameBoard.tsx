import { Snake } from './Snake';
import { Food } from './Food';
import type { Position } from '../types/game';

interface GameBoardProps {
  snake: Position[];
  food: Position;
}

export function GameBoard({ snake, food }: GameBoardProps) {
  return (
    <div className="game-board">
      <div className="grid" />
      <Snake snake={snake} />
      <Food position={food} />
    </div>
  );
}
