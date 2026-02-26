import type { Position, Direction } from "../types/game";
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
    direction: Direction
): Position {
    switch (direction) {
        case "UP":
            return { x: head.x, y: head.y - 1 };
        case "DOWN":
            return { x: head.x, y: head.y + 1 };
        case "LEFT":
            return { x: head.x - 1, y: head.y };
        case "RIGHT":
            return { x: head.x + 1, y: head.y };
    }
}

export function isCollision(position: Position, snake: Position[]): boolean {
    // Wall collision
    if (
        position.x < 0 ||
        position.x >= GRID_SIZE ||
        position.y < 0 ||
        position.y >= GRID_SIZE
    ) {
        return true;
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

export function getHighScore(): number {
    const stored = localStorage.getItem("snakeHighScore");
    return stored ? parseInt(stored, 10) : 0;
}

export function saveHighScore(score: number): void {
    localStorage.setItem("snakeHighScore", score.toString());
}
