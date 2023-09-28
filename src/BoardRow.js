import Square from "./Square";

export default function BoardRow({ indexes }) {
  return (
    <div className="board-row">
      {indexes.map((i) => (
        <Square key={i} index={i} />
      ))}
    </div>
  );
}
