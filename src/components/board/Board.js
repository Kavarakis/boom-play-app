import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGrid,
  selectOpened,
  selectTransition,
  SET_GRID,
  SET_NEIGHBOURS,
  RESET_SMILEY,
  RESET_BOOM,
  RESET_OPENED,
  RESET_LAST_EMOJI,
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
  const { end = false, isReset = false } = props;
  // States:
  const [table, handleTable] = useState([]);
  // Redux Selectors and Dispatchers:
  const dispatch = useDispatch();
  const isTransition = useSelector(selectTransition);
  const openedCards = useSelector(selectOpened);
  const grid = useSelector(selectGrid);
  /**
   * Reset states for new game.
   * @returns {void}
   */
  function resetStates() {
    dispatch(RESET_OPENED());
    dispatch(RESET_BOOM());
    dispatch(RESET_SMILEY());
    dispatch(RESET_LAST_EMOJI());
  }
  /**
   * Function for mapping Card component over array with appropiate props
   * @param {Array} temp
   * @returns {Array} arr
   */
  function generateCards(temp) {
    return temp.map((key, i) => {
      return (
        <CardComponent
          key={`${i}-${key}`}
          index={i}
          isOpened={openedCards.includes(i)}
        >
          <EmojiComponent src={key} />
        </CardComponent>
      );
    });
  }
  /**
   * Hook for table change - initialization of child card components
   */
  useEffect(() => {
    if (!table.length) {
      let res = [];
      if (grid && grid.length) {
        res = grid;
      } else {
        res = generateEmojis(6 * 6);
      }
      let pos = getPositionForEmoji(res);
      dispatch(SET_NEIGHBOURS(pos));
      dispatch(SET_GRID(res));
      handleTable(generateCards(res));
    }
  }, [table]);

  /**
   * Hook for reset signal
   */
  useEffect(() => {
    if (isReset) {
      resetStates();
      handleTable([]);
    }
  }, [isReset]);

  /**
   * Render function
   */
  return (
    <section
      className={`board-6x6 ${isTransition || end ? "block-clicking" : ""}`}
    >
      {table}
    </section>
  );
}
export default Board;
