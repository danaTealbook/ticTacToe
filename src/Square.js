import { useContext } from "react";
import { BoardContext } from "./BoardContext";

export default function Square({ index }) {
  const { squares, winningSquares, handleClick } = useContext(BoardContext);
  const value = squares[index];
  let style = "square " + (value === "X" ? "playerXColor" : "playerOColor");
  if (winningSquares.length === 3 && winningSquares.includes(index)) {
    style += " winningSquare";
  }
  return (
    <button className={style} onClick={() => handleClick(index)}>
      {value}
    </button>
  );
}
