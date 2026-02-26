import type { GameStatus, GameMode } from "../types/game";

interface GameOverlayProps {
  status: GameStatus;
  score: number;
  mode: GameMode;
  onStart: () => void;
  onResume: () => void;
  onRestart: () => void;
  onSelectMode: (mode: GameMode) => void;
}

export function GameOverlay({
  status,
  score,
  mode,
  onStart,
  onResume,
  onRestart,
  onSelectMode,
}: GameOverlayProps) {
  if (status === "playing") {
    return null;
  }

  return (
    <div className="game-overlay">
      {status === "selecting" && (
        <div className="overlay-content">
          <h1 className="game-title">SNAKE</h1>
          <p className="game-subtitle">Retro Edition</p>
          <p className="mode-select-label">SELECT GAME MODE</p>
          <div className="mode-buttons">
            <button
              className="game-button mode-btn"
              onClick={() => onSelectMode("classic")}
            >
              CLASSIC
              <span className="mode-desc">Walls kill you</span>
            </button>
            <button
              className="game-button mode-btn"
              onClick={() => onSelectMode("wrap")}
            >
              WRAP
              <span className="mode-desc">Go through walls</span>
            </button>
          </div>
        </div>
      )}

      {status === "idle" && (
        <div className="overlay-content">
          <h2 className="overlay-title">
            {mode === "classic" ? "CLASSIC MODE" : "WRAP MODE"}
          </h2>
          <button className="game-button" onClick={onStart}>
            START GAME
          </button>
          <p className="game-hints">
            Use Arrow Keys or WASD to move
            <br />
            SPACE to pause
          </p>
        </div>
      )}

      {status === "paused" && (
        <div className="overlay-content">
          <h2 className="overlay-title">PAUSED</h2>
          <button className="game-button" onClick={onResume}>
            RESUME
          </button>
          <p className="game-hints">Press SPACE to resume</p>
        </div>
      )}

      {status === "gameover" && (
        <div className="overlay-content">
          <h2 className="overlay-title">GAME OVER</h2>
          <p className="final-score">Score: {score}</p>
          <button className="game-button" onClick={onRestart}>
            PLAY AGAIN
          </button>
          <p className="game-hints">Press ENTER or R to restart</p>
        </div>
      )}
    </div>
  );
}
