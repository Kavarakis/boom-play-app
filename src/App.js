import { useEffect, useState, React } from "react";
import { CardComponent, EmojiComponent, BoardComponent } from "./components";
import { emojiCodes, shuffleCards } from "./utils";
import "./App.scss";

function generateEmojis(size, key, emojis, clickedStateFn) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(
      <CardComponent key={`${i}-${key}`} clicked={clickedStateFn}>
        <EmojiComponent src={emojis[key]} />
      </CardComponent>
    );
  }
  return arr;
}

function generateCards(size, clickedStateFn) {
  return shuffleCards([
    ...generateEmojis(size / 3, "boom", emojiCodes, clickedStateFn),
    ...generateEmojis(size / 3, "cyclone", emojiCodes, clickedStateFn),
    ...generateEmojis(size / 3, "smiley", emojiCodes, clickedStateFn),
  ]);
}

function App() {
  const [isOpening, handleIsOpening] = useState(false);
  const [table, handleTable] = useState(null);

  const generateTable = () => {
    handleTable(generateCards(6 * 6, handleIsOpening));
  };

  useEffect(() => generateTable(), []);

  return (
    <div className="container">
      <main>
        <BoardComponent clicking={isOpening}>{table}</BoardComponent>
      </main>
    </div>
  );
}

export default App;
