import { useSnake } from "./hooks/useSnake";
import { useKeyboard } from "./hooks/useKeyboard";
import { GameBoard } from "./components/GameBoard";
import { Score } from "./components/Score";
import { GameOverlay } from "./components/GameOverlay";
import type { Direction } from "./types/game";
import { isOppositeDirection } from "./utils/gameLogic";
import "./index.css";

function App() {
  const {
    gameState,
    selectMode,
    startGame,
    pauseGame,
    restartGame,
    changeDirection,
  } = useSnake();

  useKeyboard({
    onDirectionChange: changeDirection,
    onPause: pauseGame,
    onRestart: restartGame,
    onSelectMode: selectMode,
    currentDirection: gameState.direction,
    gameStatus: gameState.status,
  });

  const handleMobileDirection = (newDirection: Direction) => {
    // Only allow direction change if it's not opposite to current direction
    if (
      gameState.status === "idle" ||
      !isOppositeDirection(newDirection, gameState.direction)
    ) {
      changeDirection(newDirection);
    }
  };

  return (
    <div className="app">
      <Score score={gameState.score} highScore={gameState.highScore} />

      <div className="game-board">
        <GameBoard snake={gameState.snake} food={gameState.food} />

        <GameOverlay
          status={gameState.status}
          score={gameState.score}
          mode={gameState.mode}
          onStart={startGame}
          onResume={pauseGame}
          onRestart={restartGame}
          onSelectMode={selectMode}
        />
      </div>

      <div className="mobile-controls">
        <div className="control-row">
          <button
            className="control-btn"
            onClick={() => handleMobileDirection("UP")}
            aria-label="Move Up"
          >
            ▲
          </button>
        </div>
        <div className="control-row">
          <button
            className="control-btn"
            onClick={() => handleMobileDirection("LEFT")}
            aria-label="Move Left"
          >
            ◀
          </button>
          <button
            className="control-btn"
            onClick={() => handleMobileDirection("DOWN")}
            aria-label="Move Down"
          >
            ▼
          </button>
          <button
            className="control-btn"
            onClick={() => handleMobileDirection("RIGHT")}
            aria-label="Move Right"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
