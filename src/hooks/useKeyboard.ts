import { useEffect, useCallback } from "react";
import type { Direction, GameMode } from "../types/game";
import { isOppositeDirection } from "../utils/gameLogic";

interface UseKeyboardOptions {
    onDirectionChange: (direction: Direction) => void;
    onPause: () => void;
    onRestart: () => void;
    onSelectMode: (mode: GameMode) => void;
    currentDirection: Direction;
    gameStatus: "selecting" | "idle" | "playing" | "paused" | "gameover";
}

export function useKeyboard({
    onDirectionChange,
    onPause,
    onRestart,
    onSelectMode,
    currentDirection,
    gameStatus,
}: UseKeyboardOptions) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const keyMap: Record<string, Direction> = {
                ArrowUp: "UP",
                ArrowDown: "DOWN",
                ArrowLeft: "LEFT",
                ArrowRight: "RIGHT",
                w: "UP",
                W: "UP",
                s: "DOWN",
                S: "DOWN",
                a: "LEFT",
                A: "LEFT",
                d: "RIGHT",
                D: "RIGHT",
            };

            const direction = keyMap[e.key];

            if (direction) {
                e.preventDefault();
                // Allow reversing direction when game is not playing (for initial move)
                if (gameStatus === "idle" || gameStatus === "playing") {
                    if (!isOppositeDirection(direction, currentDirection)) {
                        onDirectionChange(direction);
                    }
                }
            }

            if (e.key === " " || e.key === "Escape") {
                e.preventDefault();
                if (gameStatus === "playing" || gameStatus === "paused") {
                    onPause();
                }
            }

            if (
                (e.key === "Enter" || e.key === "r" || e.key === "R") &&
                gameStatus === "gameover"
            ) {
                e.preventDefault();
                onRestart();
            }

            // Mode selection when in selecting state
            if (gameStatus === "selecting") {
                if (e.key === "1" || e.key === "c" || e.key === "C") {
                    e.preventDefault();
                    onSelectMode("classic");
                }
                if (e.key === "2" || e.key === "w" || e.key === "W") {
                    e.preventDefault();
                    onSelectMode("wrap");
                }
            }
        },
        [
            onDirectionChange,
            onPause,
            onRestart,
            onSelectMode,
            currentDirection,
            gameStatus,
        ]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);
}
