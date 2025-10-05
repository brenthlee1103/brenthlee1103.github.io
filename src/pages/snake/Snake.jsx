import { useState, useEffect, useCallback } from "react";
import "./snake.scss";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setGameStarted(true);
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (!gameStarted && e.key.startsWith("Arrow")) {
        resetGame();
        return;
      }

      if (gameOver) return;

      if (e.key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
        return;
      }

      const keyMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        const newDir = keyMap[e.key];

        if (direction.x + newDir.x !== 0 || direction.y + newDir.y !== 0) {
          setNextDirection(newDir);
        }
      }
    },
    [gameOver, gameStarted, direction]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setDirection(nextDirection);

      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + nextDirection.x,
          y: head.y + nextDirection.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE ||
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => prev + 10);
          setFood(generateFood(newSnake));
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [nextDirection, food, gameOver, isPaused, gameStarted, generateFood]);

  return (
    <div className="snake-game-container">
      <div className="game-info">
        <div className="score-display">Score: {score}</div>
        <div className="length-display">Length: {snake.length}</div>
      </div>

      <div className="game-board-container">
        <div className="game-board">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnake = snake.some(
              (segment) => segment.x === x && segment.y === y
            );
            const isHead = snake[0]?.x === x && snake[0]?.y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                className={`cell ${isSnake ? "snake" : ""} ${
                  isHead ? "head" : ""
                } ${isFood ? "food" : ""}`}
              />
            );
          })}
        </div>

        {!gameStarted && (
          <div className="game-overlay">
            <div className="overlay-content">
              <div className="game-title">SNAKE</div>
              <div className="start-message">Press any Arrow Key to Start</div>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="game-overlay">
            <div className="overlay-content">
              <div className="game-over-title">GAME OVER</div>
              <div className="final-score">Score: {score}</div>
              <div className="final-length">Length: {snake.length}</div>
              <button onClick={resetGame} className="restart-btn">
                Play Again
              </button>
            </div>
          </div>
        )}

        {isPaused && !gameOver && gameStarted && (
          <div className="game-overlay">
            <div className="overlay-content">
              <div className="pause-title">PAUSED</div>
              <div className="pause-message">Press SPACE to continue</div>
            </div>
          </div>
        )}
      </div>

      <div className="game-controls">
        <div className="control-row">
          <div>Arrow Keys or WASD to move</div>
        </div>
        <div className="control-row">
          <div>SPACE to pause</div>
        </div>
      </div>
    </div>
  );
}

export default Snake;
