import { useState } from "react";
import { BoardContext } from "./BoardContext";
import Board from "./Board";

export const playerXColor = "red";
export const playerOColor = "#3376f2";
export const drawColor = "grey";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function findWinningSquares(squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return [];
}

function findWinner(squares) {
  const winnersFound = findWinningSquares(squares);
  if (winnersFound.length > 0) {
    return squares[winnersFound[0]];
  }
  return null;
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [moveCount, setMoveCount] = useState(0);
  const [results, setResults] = useState(Array(3).fill(0));
  const xIsNext = moveCount % 2 === 0;

  const winner = findWinner(squares);
  let status = winner
    ? "Winner: " + winner
    : moveCount === 9
    ? "Draw"
    : "Next player: " + (xIsNext ? "X" : "O");
  const winningSquares = findWinningSquares(squares);

  function handleResults(newSquares, newMoveCount) {
    const newWinner = findWinner(newSquares);
    if (newWinner) {
      if (newWinner === "X") {
        const newCount = results[0] + 1;
        setResults([newCount, ...results.slice(1)]);
      } else {
        const newCount = results[1] + 1;
        setResults([results[0], newCount, results[2]]);
      }
    } else if (newMoveCount === 9) {
      const newCount = results[2] + 1;
      setResults([results[0], results[1], newCount]);
    }
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setMoveCount(moveCount + 1);
    handleResults(nextSquares, moveCount + 1);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setMoveCount(0);
  }

  return (
    <BoardContext.Provider value={{ squares, winningSquares, handleClick }}>
      <div
        className="status"
        style={{
          color:
            winner === "X"
              ? playerXColor
              : winner === "O"
              ? playerOColor
              : moveCount === 9
              ? drawColor
              : "black"
        }}
      >
        {status}
      </div>
      <div className="board">
        <div>
          <Board />
          <div className="results ">
            <div style={{ color: playerXColor }}>Player X: {results[0]}</div>
            <div style={{ color: playerOColor }}>Player O: {results[1]}</div>
            <div style={{ color: drawColor }}>Draw: {results[2]}</div>
          </div>
          <button onClick={handleRestart} className="restart">
            Play again
          </button>
        </div>
      </div>
    </BoardContext.Provider>
  );
}
