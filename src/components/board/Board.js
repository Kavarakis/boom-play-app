import "./Board.scss";

function Board(props) {
  const { clicking, children } = props;
  return (
    <section className={`board-6x6 ${clicking ? "block-clicking" : ""}`}>
      {children}
    </section>
  );
}
export default Board;
