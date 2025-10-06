import { useState, useEffect, useRef } from "react";
import "./snake.scss";

function Snake() {
  const GRID_SIZE = 20;
  const INITIAL_SNAKE = [{ x: 10, y: 10 }];
  const INITIAL_DIRECTION = { x: 1, y: 0 };
  const GAME_SPEED = 150;

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const directionRef = useRef(direction);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = (currentSnake) => {
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
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 15, y: 15 });
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying || gameOver) return;

      const currentDir = directionRef.current;

      switch (e.key) {
        case "ArrowUp":
          if (currentDir.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (currentDir.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (currentDir.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (currentDir.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Check self collision
        if (
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(generateFood(newSnake));
          setScore((prev) => prev + 10);
          return newSnake;
        }

        // Remove tail if no food eaten
        newSnake.pop();
        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, food]);

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>🐍 Snake Game</h1>
        <div className="score">Score: {score}</div>
      </div>

      <div className="game-board">
        <div className="grid">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnake = snake.some(
              (segment) => segment.x === x && segment.y === y
            );
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                className={`cell ${isSnake ? "snake" : ""} ${
                  isFood ? "food" : ""
                }`}
              />
            );
          })}
        </div>

        {gameOver && (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <button className="btn" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="game-controls">
        {!isPlaying && !gameOver && (
          <button className="btn" onClick={resetGame}>
            Start Game
          </button>
        )}
      </div>

      <div className="instructions">Use arrow keys to control the snake</div>
    </div>
  );
}

export default Snake;
