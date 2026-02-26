import type { Position, Direction, GameMode } from "../types/game";
import { GRID_SIZE } from "../types/game";

export function createInitialSnake(): Position[] {
    const startX = Math.floor(GRID_SIZE / 2);
    const startY = Math.floor(GRID_SIZE / 2);
    return [
        { x: startX, y: startY },
        { x: startX, y: startY + 1 },
        { x: startX, y: startY + 2 },
    ];
}

export function createFood(snake: Position[]): Position {
    let food: Position;
    do {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    } while (
        snake.some((segment) => segment.x === food.x && segment.y === food.y)
    );
    return food;
}

export function getNextPosition(
    head: Position,
    direction: Direction,
    mode: GameMode
): Position {
    let newX = head.x;
    let newY = head.y;

    switch (direction) {
        case "UP":
            newY = head.y - 1;
            break;
        case "DOWN":
            newY = head.y + 1;
            break;
        case "LEFT":
            newX = head.x - 1;
            break;
        case "RIGHT":
            newX = head.x + 1;
            break;
    }

    // Wrap-around logic for 'wrap' mode
    if (mode === "wrap") {
        if (newX < 0) newX = GRID_SIZE - 1;
        if (newX >= GRID_SIZE) newX = 0;
        if (newY < 0) newY = GRID_SIZE - 1;
        if (newY >= GRID_SIZE) newY = 0;
    }

    return { x: newX, y: newY };
}

export function isCollision(
    position: Position,
    snake: Position[],
    mode: GameMode
): boolean {
    // Wall collision (only in classic mode)
    if (mode === "classic") {
        if (
            position.x < 0 ||
            position.x >= GRID_SIZE ||
            position.y < 0 ||
            position.y >= GRID_SIZE
        ) {
            return true;
        }
    }
    // Self collision (skip head which is at index 0)
    return snake
        .slice(1)
        .some(
            (segment) => segment.x === position.x && segment.y === position.y
        );
}

export function isOppositeDirection(a: Direction, b: Direction): boolean {
    const opposites: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
    };
    return opposites[a] === b;
}

export function getHighScore(mode: GameMode): number {
    const key =
        mode === "wrap" ? "snakeHighScoreWrap" : "snakeHighScoreClassic";
    const stored = localStorage.getItem(key);
    return stored ? parseInt(stored, 10) : 0;
}

export function saveHighScore(score: number, mode: GameMode): void {
    const key =
        mode === "wrap" ? "snakeHighScoreWrap" : "snakeHighScoreClassic";
    localStorage.setItem(key, score.toString());
}
