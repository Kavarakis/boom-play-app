import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTransition,
  SET_NEIGHBOURS,
} from "../../redux/reducers/gameCountReducer";
import { CardComponent, EmojiComponent } from "../";
import { emojiCodes, getPositionForEmoji, shuffleArray } from "../../utils";
import "./Board.scss";
/**
 * Function for generating 3 batches of emojis with same size
 * @param {number} size
 * @returns {Array} arr - Return shuffled Array
 */
function generateEmojis(size) {
  let arr = [
    ...Array(size / 3).fill(emojiCodes["boom"]),
    ...Array(size / 3).fill(emojiCodes["smiley"]),
    ...Array(size / 3).fill(emojiCodes["cyclone"]),
  ];
  return shuffleArray(arr);
}

function Board(props) {
  // Props:
  const { end } = props;
  // States:
  const [table, handleTable] = useState([]);
  // Redux Selectors and Dispatchers:
  const dispatch = useDispatch();
  const isTransition = useSelector(selectTransition);
  /**
   * Function for mapping Card component over array with appropiate props
   * @param {Array} temp
   * @returns {Array} arr
   */
  function generateCards(temp) {
    return temp.map((key, i) => {
      return (
        <CardComponent key={`${i}-${key}`} index={i}>
          <EmojiComponent src={key} />
        </CardComponent>
      );
    });
  }
  useEffect(() => {
    let res = generateEmojis(6 * 6);
    let pos = getPositionForEmoji(res);

    handleTable(generateCards(res));
    dispatch(SET_NEIGHBOURS(pos));
  }, []);

  return (
    <section
      className={`board-6x6 ${isTransition || end ? "block-clicking" : ""}`}
    >
      {table}
    </section>
  );
}
export default Board;
