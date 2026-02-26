import { useState, useCallback, useEffect, useRef } from "react";
import type { Direction, GameState, GameMode } from "../types/game";
import { INITIAL_SPEED, SPEED_INCREMENT, MIN_SPEED } from "../types/game";
import {
    createInitialSnake,
    createFood,
    getNextPosition,
    isCollision,
    getHighScore,
    saveHighScore,
} from "../utils/gameLogic";

export function useSnake() {
    const [gameState, setGameState] = useState<GameState>(() => ({
        snake: createInitialSnake(),
        food: createFood(createInitialSnake()),
        direction: "UP",
        nextDirection: "UP",
        score: 0,
        highScore: getHighScore("classic"),
        status: "selecting",
        speed: INITIAL_SPEED,
        mode: "classic",
    }));

    const gameLoopRef = useRef<number | null>(null);

    const selectMode = useCallback((mode: GameMode) => {
        const initialSnake = createInitialSnake();
        setGameState({
            snake: initialSnake,
            food: createFood(initialSnake),
            direction: "UP",
            nextDirection: "UP",
            score: 0,
            highScore: getHighScore(mode),
            status: "idle",
            speed: INITIAL_SPEED,
            mode,
        });
    }, []);

    const startGame = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            status: "playing",
        }));
    }, []);

    const pauseGame = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            status: prev.status === "playing" ? "paused" : "playing",
        }));
    }, []);

    const restartGame = useCallback(() => {
        setGameState((prev) => ({
            snake: createInitialSnake(),
            food: createFood(createInitialSnake()),
            direction: "UP",
            nextDirection: "UP",
            score: 0,
            highScore: getHighScore(prev.mode),
            status: "idle",
            speed: INITIAL_SPEED,
            mode: prev.mode,
        }));
    }, []);

    const changeDirection = useCallback((newDirection: Direction) => {
        setGameState((prev) => ({
            ...prev,
            nextDirection: newDirection,
        }));
    }, []);

    const gameLoop = useCallback(() => {
        setGameState((prev) => {
            if (prev.status !== "playing") {
                return prev;
            }

            // Use the buffered nextDirection
            const currentDirection = prev.nextDirection;
            const head = prev.snake[0];
            const newHead = getNextPosition(head, currentDirection, prev.mode);

            // Check collision
            if (isCollision(newHead, prev.snake, prev.mode)) {
                const newHighScore = Math.max(prev.score, prev.highScore);
                if (newHighScore > prev.highScore) {
                    saveHighScore(newHighScore, prev.mode);
                }
                return {
                    ...prev,
                    status: "gameover",
                    highScore: newHighScore,
                };
            }

            // Check if food is eaten
            const ateFood =
                newHead.x === prev.food.x && newHead.y === prev.food.y;
            const newSnake = [newHead, ...prev.snake];

            if (!ateFood) {
                newSnake.pop(); // Remove tail if no food eaten
            }

            let newScore = prev.score;
            let newSpeed = prev.speed;

            if (ateFood) {
                newScore = prev.score + 10;
                newSpeed = Math.max(MIN_SPEED, prev.speed - SPEED_INCREMENT);
            }

            return {
                ...prev,
                snake: newSnake,
                food: ateFood ? createFood(newSnake) : prev.food,
                direction: currentDirection,
                score: newScore,
                speed: newSpeed,
            };
        });
    }, []);

    // Game loop effect
    useEffect(() => {
        if (gameState.status === "playing") {
            gameLoopRef.current = window.setInterval(gameLoop, gameState.speed);
        } else {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        }

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        };
    }, [gameState.status, gameState.speed, gameLoop]);

    return {
        gameState,
        selectMode,
        startGame,
        pauseGame,
        restartGame,
        changeDirection,
    };
}
