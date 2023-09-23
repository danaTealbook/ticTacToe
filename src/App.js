import { useState } from "react";

const playerXColor = "red";
const playerOColor = "#3376f2";
const drawColor = "grey";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      style={{ color: value === "X" ? playerXColor : playerOColor }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function BoardRow({ squares, onSquareClick, indexes }) {
  return (
    <div className="board-row">
      {indexes.map((i) => (
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => onSquareClick(i)}
        />
      ))}
    </div>
  );
}
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [moveCount, setMoveCount] = useState(0);
  const [winners, setWinners] = useState(Array(3).fill(0));
  const xIsNext = moveCount % 2 === 0;

  const winner = calculateWinner(squares);
  let status = winner
    ? "Winner: " + winner
    : moveCount === 9
    ? "Draw"
    : "Next player: " + (xIsNext ? "X" : "O");

  function handleWinners(newSquares, newMoveCount) {
    const newWinner = calculateWinner(newSquares);
    if (newWinner) {
      if (newWinner === "X") {
        const newCount = winners[0] + 1;
        setWinners([newCount, ...winners.slice(1)]);
      } else {
        const newCount = winners[1] + 1;
        setWinners([winners[0], newCount, winners[2]]);
      }
    } else if (newMoveCount === 9) {
      const newCount = winners[2] + 1;
      setWinners([winners[0], winners[1], newCount]);
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
    handleWinners(nextSquares, moveCount + 1);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setMoveCount(0);
  }

  return (
    <>
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
          <div>
            <BoardRow
              squares={squares}
              onSquareClick={handleClick}
              indexes={[0, 1, 2]}
            />
            <BoardRow
              squares={squares}
              onSquareClick={handleClick}
              indexes={[3, 4, 5]}
            />
            <BoardRow
              squares={squares}
              onSquareClick={handleClick}
              indexes={[6, 7, 8]}
            />
          </div>
          <div className="results ">
            <div style={{ color: playerXColor }}>Player X: {winners[0]}</div>
            <div style={{ color: playerOColor }}>Player O: {winners[1]}</div>
            <div style={{ color: drawColor }}>Draw: {winners[2]}</div>
          </div>
          <button onClick={handleRestart} className="restart">
            Play again
          </button>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
