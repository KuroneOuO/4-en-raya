import React, { useState } from "react";
import "./styles.css";

const ROWS = 6;
const COLS = 7;
const EMPTY = null;

// Función para verificar si hay un ganador
const checkWinner = (board) => {
  const directions = [
    [1, 0], // Vertical
    [0, 1], // Horizontal
    [1, 1], // Diagonal \
    [1, -1], // Diagonal /
  ];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const player = board[row][col];
      if (!player) continue;

      for (let [dx, dy] of directions) {
        let count = 1;

        for (let i = 1; i < 4; i++) {
          const x = row + dx * i;
          const y = col + dy * i;
          if (
            x >= 0 &&
            x < ROWS &&
            y >= 0 &&
            y < COLS &&
            board[x][y] === player
          ) {
            count++;
          } else {
            break;
          }
        }

        if (count === 4) return player;
      }
    }
  }
  return null;
};

export default function App() {
  const [board, setBoard] = useState(
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(EMPTY))
  );
  const [player, setPlayer] = useState("🔴");
  const [winner, setWinner] = useState(null);

  const dropDisc = (col) => {
    if (winner) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][col]) {
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = player;
        setBoard(newBoard);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
          setWinner(gameWinner);
        } else {
          setPlayer(player === "🔴" ? "🟡" : "🔴");
        }
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(
      Array(ROWS)
        .fill(null)
        .map(() => Array(COLS).fill(EMPTY))
    );
    setPlayer("🔴");
    setWinner(null);
  };

  return (
    <div className="container">
      <h1>4 en Raya</h1>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              onClick={() => dropDisc(colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      {winner ? <h2>¡{winner} gana!</h2> : <h2>Turno: {player}</h2>}
      <button onClick={resetGame}>Reiniciar</button>
    </div>
  );
}
