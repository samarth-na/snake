import type { Position } from '../types/game';
import { GRID_SIZE } from '../types/game';

interface FoodProps {
  position: Position;
}

export function Food({ position }: FoodProps) {
  return (
    <div
      className="food"
      style={{
        left: `${(position.x / GRID_SIZE) * 100}%`,
        top: `${(position.y / GRID_SIZE) * 100}%`,
        width: `${100 / GRID_SIZE}%`,
        height: `${100 / GRID_SIZE}%`,
      }}
    />
  );
}
