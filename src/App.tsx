import { useSnake } from "./hooks/useSnake";
import { useKeyboard } from "./hooks/useKeyboard";
import { GameBoard } from "./components/GameBoard";
import { Score } from "./components/Score";
import { GameOverlay } from "./components/GameOverlay";
import "./index.css";

function App() {
  const { gameState, startGame, pauseGame, restartGame, changeDirection } =
    useSnake();

  useKeyboard({
    onDirectionChange: changeDirection,
    onPause: pauseGame,
    onRestart: restartGame,
    currentDirection: gameState.direction,
    gameStatus: gameState.status,
  });

  return (
    <div className="app">
      <Score score={gameState.score} highScore={gameState.highScore} />

      <div className="game-board">
        <GameBoard snake={gameState.snake} food={gameState.food} />

        <GameOverlay
          status={gameState.status}
          score={gameState.score}
          onStart={startGame}
          onResume={pauseGame}
          onRestart={restartGame}
        />
      </div>

      <div className="mobile-controls">
        <div className="control-row">
          <button
            className="control-btn"
            onClick={() => changeDirection("UP")}
            aria-label="Move Up"
          >
            ▲
          </button>
        </div>
        <div className="control-row">
          <button
            className="control-btn"
            onClick={() => changeDirection("LEFT")}
            aria-label="Move Left"
          >
            ◀
          </button>
          <button
            className="control-btn"
            onClick={() => changeDirection("DOWN")}
            aria-label="Move Down"
          >
            ▼
          </button>
          <button
            className="control-btn"
            onClick={() => changeDirection("RIGHT")}
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
