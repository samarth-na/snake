interface ScoreProps {
  score: number;
  highScore: number;
}

export function Score({ score, highScore }: ScoreProps) {
  return (
    <div className="score-board">
      <div className="score-item">
        <span className="score-label">SCORE</span>
        <span className="score-value">{score}</span>
      </div>
      <div className="score-item">
        <span className="score-label">HIGH SCORE</span>
        <span className="score-value">{highScore}</span>
      </div>
    </div>
  );
}
