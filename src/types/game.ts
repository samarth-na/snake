export interface Position {
    x: number;
    y: number;
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type GameStatus =
    | "idle"
    | "selecting"
    | "playing"
    | "paused"
    | "gameover";

export type GameMode = "classic" | "wrap";

export interface GameState {
    snake: Position[];
    food: Position;
    direction: Direction;
    nextDirection: Direction; // Buffer for quick key presses
    score: number;
    highScore: number;
    status: GameStatus;
    speed: number;
    mode: GameMode;
}

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREMENT = 5;
export const MIN_SPEED = 50;
