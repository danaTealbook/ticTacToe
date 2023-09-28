import { playerXColor, playerOColor } from "./App.js";
import { useContext } from "react";
import { BoardContext } from "./BoardContext";

export default function Square({ index }) {
  const { squares, winningSquares, handleClick } = useContext(BoardContext);
  const value = squares[index];
  let style = "square";
  if (winningSquares.length === 3 && winningSquares.includes(index)) {
    style += " winningSquare";
  }
  return (
    <button
      className={style}
      style={{ color: value === "X" ? playerXColor : playerOColor }}
      onClick={() => handleClick(index)}
    >
      {value}
    </button>
  );
}
