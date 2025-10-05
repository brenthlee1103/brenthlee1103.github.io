import { useState, useEffect, useCallback } from "react";
import "./pac-man.scss";

const CELL_SIZE = 20;
const GRID_WIDTH = 28;
const GRID_HEIGHT = 31;

const MAZE = [
  "############################",
  "#............##............#",
  "#.####.#####.##.#####.####.#",
  "#o####.#####.##.#####.####o#",
  "#.####.#####.##.#####.####.#",
  "#..........................#",
  "#.####.##.########.##.####.#",
  "#.####.##.########.##.####.#",
  "#......##....##....##......#",
  "######.##### ## #####.######",
  "######.##### ## #####.######",
  "######.##          ##.######",
  "######.## ###--### ##.######",
  "######.## #      # ##.######",
  "      .   #      #   .      ",
  "######.## #      # ##.######",
  "######.## ######## ##.######",
  "######.##          ##.######",
  "######.## ######## ##.######",
  "######.## ######## ##.######",
  "#............##............#",
  "#.####.#####.##.#####.####.#",
  "#.####.#####.##.#####.####.#",
  "#o..##.......  .......##..o#",
  "###.##.##.########.##.##.###",
  "###.##.##.########.##.##.###",
  "#......##....##....##......#",
  "#.##########.##.##########.#",
  "#.##########.##.##########.#",
  "#..........................#",
  "############################",
];

const GHOSTS = [
  { id: 1, color: "red", startX: 12, startY: 14 },
  { id: 2, color: "pink", startX: 13, startY: 14 },
  { id: 3, color: "cyan", startX: 14, startY: 14 },
  { id: 4, color: "orange", startX: 15, startY: 14 },
];

function PacMan() {
  const [pacman, setPacman] = useState({ x: 14, y: 23, dir: 0 });
  const [ghosts, setGhosts] = useState(
    GHOSTS.map((g) => ({ ...g, x: g.startX, y: g.startY, dir: 0 }))
  );
  const [pellets, setPellets] = useState([]);
  const [powerPellets, setPowerPellets] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [scared, setScared] = useState(false);
  const [scaredTimer, setScaredTimer] = useState(0);
  const [lives, setLives] = useState(3);
  const [direction, setDirection] = useState(0);
  const [nextDirection, setNextDirection] = useState(0);

  useEffect(() => {
    const newPellets = [];
    const newPowerPellets = [];

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (MAZE[y][x] === ".") {
          newPellets.push({ x, y });
        } else if (MAZE[y][x] === "o") {
          newPowerPellets.push({ x, y });
        }
      }
    }

    setPellets(newPellets);
    setPowerPellets(newPowerPellets);
  }, []);

  const isWall = (x, y) => {
    if (y < 0 || y >= GRID_HEIGHT || x < 0 || x >= GRID_WIDTH) return true;
    const cell = MAZE[y][x];
    return cell === "#";
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (gameOver) return;

      const keyMap = {
        ArrowUp: 1,
        ArrowDown: 2,
        ArrowLeft: 3,
        ArrowRight: 0,
        w: 1,
        s: 2,
        a: 3,
        d: 0,
      };

      if (keyMap[e.key] !== undefined) {
        e.preventDefault();
        setNextDirection(keyMap[e.key]);
      }
    },
    [gameOver]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setPacman((prev) => {
        const dirs = [
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, 0],
        ];

        const [nextDx, nextDy] = dirs[nextDirection];
        const nextX = prev.x + nextDx;
        const nextY = prev.y + nextDy;

        if (!isWall(nextX, nextY)) {
          setDirection(nextDirection);
          return { x: nextX, y: nextY, dir: nextDirection };
        }

        const [dx, dy] = dirs[direction];
        const newX = prev.x + dx;
        const newY = prev.y + dy;

        if (!isWall(newX, newY)) {
          return { x: newX, y: newY, dir: direction };
        }

        return prev;
      });

      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) => {
          const dirs = [
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, 0],
          ];
          const possibleDirs = dirs
            .map((d, i) => ({ dir: i, dx: d[0], dy: d[1] }))
            .filter((d) => !isWall(ghost.x + d.dx, ghost.y + d.dy));

          if (possibleDirs.length === 0) return ghost;

          const randomDir =
            possibleDirs[Math.floor(Math.random() * possibleDirs.length)];

          return {
            ...ghost,
            x: ghost.x + randomDir.dx,
            y: ghost.y + randomDir.dy,
            dir: randomDir.dir,
          };
        })
      );

      if (scaredTimer > 0) {
        setScaredTimer((prev) => prev - 1);
        if (scaredTimer === 1) {
          setScared(false);
        }
      }
    }, 200);

    return () => clearInterval(gameLoop);
  }, [direction, nextDirection, gameOver, scaredTimer]);

  useEffect(() => {
    setPellets((prev) => {
      const newPellets = prev.filter(
        (p) => !(p.x === pacman.x && p.y === pacman.y)
      );
      if (newPellets.length < prev.length) {
        setScore((s) => s + 10);
      }
      if (newPellets.length === 0 && powerPellets.length === 0) {
        setGameOver(true);
      }
      return newPellets;
    });

    setPowerPellets((prev) => {
      const newPowerPellets = prev.filter(
        (p) => !(p.x === pacman.x && p.y === pacman.y)
      );
      if (newPowerPellets.length < prev.length) {
        setScore((s) => s + 50);
        setScared(true);
        setScaredTimer(30);
      }
      return newPowerPellets;
    });

    const hitGhost = ghosts.find((g) => g.x === pacman.x && g.y === pacman.y);
    if (hitGhost) {
      if (scared) {
        setScore((s) => s + 200);
        setGhosts((prev) =>
          prev.map((g) =>
            g.id === hitGhost.id ? { ...g, x: g.startX, y: g.startY } : g
          )
        );
      } else {
        setLives((prev) => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameOver(true);
          } else {
            setPacman({ x: 14, y: 23, dir: 0 });
            setDirection(0);
            setNextDirection(0);
            setGhosts(
              GHOSTS.map((g) => ({ ...g, x: g.startX, y: g.startY, dir: 0 }))
            );
          }
          return newLives;
        });
      }
    }
  }, [pacman, ghosts, scared, powerPellets.length]);

  const reset = () => {
    setPacman({ x: 14, y: 23, dir: 0 });
    setDirection(0);
    setNextDirection(0);
    setGhosts(GHOSTS.map((g) => ({ ...g, x: g.startX, y: g.startY, dir: 0 })));
    setScore(0);
    setGameOver(false);
    setScared(false);
    setScaredTimer(0);
    setLives(3);

    const newPellets = [];
    const newPowerPellets = [];

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (MAZE[y][x] === ".") {
          newPellets.push({ x, y });
        } else if (MAZE[y][x] === "o") {
          newPowerPellets.push({ x, y });
        }
      }
    }

    setPellets(newPellets);
    setPowerPellets(newPowerPellets);
  };

  const getPacmanClipPath = (dir) => {
    switch (dir) {
      case 0:
        return "polygon(100% 50%, 50% 0, 50% 100%)";
      case 1:
        return "polygon(50% 0, 0 50%, 100% 50%)";
      case 2:
        return "polygon(50% 100%, 0 50%, 100% 50%)";
      case 3:
        return "polygon(0 50%, 50% 0, 50% 100%)";
      default:
        return "polygon(100% 50%, 50% 0, 50% 100%)";
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="score">Score: {score}</div>
        <div className="lives">Lives: {"❤️".repeat(lives)}</div>
      </div>

      <div
        className="game-board"
        style={{
          width: GRID_WIDTH * CELL_SIZE,
          height: GRID_HEIGHT * CELL_SIZE,
        }}
      >
        {MAZE.map((row, y) =>
          row.split("").map((cell, x) => {
            if (cell === "#") {
              return (
                <div
                  key={`${x}-${y}`}
                  className="wall"
                  style={{
                    left: x * CELL_SIZE,
                    top: y * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                  }}
                />
              );
            }
            return null;
          })
        )}

        {pellets.map((pellet, i) => (
          <div
            key={`pellet-${i}`}
            className="pellet"
            style={{
              left: pellet.x * CELL_SIZE + CELL_SIZE / 2 - 2,
              top: pellet.y * CELL_SIZE + CELL_SIZE / 2 - 2,
            }}
          />
        ))}

        {powerPellets.map((pellet, i) => (
          <div
            key={`power-${i}`}
            className="power-pellet"
            style={{
              left: pellet.x * CELL_SIZE + CELL_SIZE / 2 - 5,
              top: pellet.y * CELL_SIZE + CELL_SIZE / 2 - 5,
            }}
          />
        ))}

        <div
          className="pacman"
          style={{
            left: pacman.x * CELL_SIZE,
            top: pacman.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            clipPath: getPacmanClipPath(pacman.dir),
          }}
        />

        {ghosts.map((ghost) => (
          <div
            key={ghost.id}
            className={`ghost ${scared ? "scared" : ""}`}
            data-color={ghost.color}
            style={{
              left: ghost.x * CELL_SIZE,
              top: ghost.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          >
            <div className="ghost-bottom">
              <div className="ghost-wave" />
              <div className="ghost-wave" />
              <div className="ghost-wave" />
            </div>
            {!scared && (
              <div className="ghost-eyes">
                <div className="eye">
                  <div className="pupil" />
                </div>
                <div className="eye">
                  <div className="pupil" />
                </div>
              </div>
            )}
          </div>
        ))}

        {gameOver && (
          <div className="game-over-overlay">
            <div className="game-over-content">
              <div className="game-over-title">
                {pellets.length === 0 && powerPellets.length === 0
                  ? "YOU WIN!"
                  : "GAME OVER"}
              </div>
              <div className="final-score">Final Score: {score}</div>
              <button onClick={reset} className="play-again-btn">
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="game-instructions">
        <div>Use Arrow Keys or WASD to move</div>
        <div className="game-tip">
          Eat all pellets to win! Power pellets let you eat ghosts!
        </div>
      </div>
    </div>
  );
}

export default PacMan;
