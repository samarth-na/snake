import type { Position } from '../types/game';
import { GRID_SIZE } from '../types/game';

interface SnakeProps {
  snake: Position[];
}

export function Snake({ snake }: SnakeProps) {
  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`snake-segment ${index === 0 ? 'snake-head' : ''}`}
          style={{
            left: `${(segment.x / GRID_SIZE) * 100}%`,
            top: `${(segment.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
          }}
        />
      ))}
    </>
  );
}
