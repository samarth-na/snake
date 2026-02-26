import { useEffect, useCallback } from 'react';
import type { Direction } from '../types/game';
import { isOppositeDirection } from '../utils/gameLogic';

interface UseKeyboardOptions {
  onDirectionChange: (direction: Direction) => void;
  onPause: () => void;
  onRestart: () => void;
  currentDirection: Direction;
  gameStatus: 'idle' | 'playing' | 'paused' | 'gameover';
}

export function useKeyboard({
  onDirectionChange,
  onPause,
  onRestart,
  currentDirection,
  gameStatus,
}: UseKeyboardOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        w: 'UP',
        W: 'UP',
        s: 'DOWN',
        S: 'DOWN',
        a: 'LEFT',
        A: 'LEFT',
        d: 'RIGHT',
        D: 'RIGHT',
      };

      const direction = keyMap[e.key];

      if (direction) {
        e.preventDefault();
        // Allow reversing direction when game is not playing (for initial move)
        if (gameStatus === 'idle' || gameStatus === 'playing') {
          if (!isOppositeDirection(direction, currentDirection)) {
            onDirectionChange(direction);
          }
        }
      }

      if (e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        if (gameStatus === 'playing' || gameStatus === 'paused') {
          onPause();
        }
      }

      if ((e.key === 'Enter' || e.key === 'r' || e.key === 'R') && gameStatus === 'gameover') {
        e.preventDefault();
        onRestart();
      }
    },
    [onDirectionChange, onPause, onRestart, currentDirection, gameStatus]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
