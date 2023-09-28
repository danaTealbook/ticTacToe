import BoardRow from "./BoardRow";

export default function Board() {
  return (
    <div>
      <BoardRow indexes={[0, 1, 2]} />
      <BoardRow indexes={[3, 4, 5]} />
      <BoardRow indexes={[6, 7, 8]} />
    </div>
  );
}
