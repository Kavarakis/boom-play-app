import { useState, React, useEffect } from "react";
import { emojiCodes, getIndicesOfNeighbours } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_OPENED,
  INCREASE_BOOM,
  INCREASE_SMILEY,
  IS_TRANSITION,
  LAST_EMOJI,
  RESET_BOOM,
  RESET_SMILEY,
  selectNeighbours,
  selectOpened,
} from "../../redux/reducers/gameCountReducer";
import { EmojiComponent } from "..";
import "./card.scss";

function Card(props) {
  // Props:
  const { index = 0, children = <EmojiComponent />, isOpened = false } = props;
  // States:
  const [isClicked, handleisClicked] = useState(false);
  const [showBody, handleShowBody] = useState(false);
  const [neighbours, handleNeighbours] = useState({});
  // Redux Selectors and Dispatchers:
  const dispatch = useDispatch();
  const neighboursSelector = useSelector(selectNeighbours);
  const openedSelector = useSelector(selectOpened);
  /**
   *  Function for executing Redux actions on configured store
   * @param {Object} props
   * @returns {void}
   */
  function checkEmoji(props) {
    switch (props.src) {
      case emojiCodes.smiley:
        dispatch(INCREASE_SMILEY());
        dispatch(RESET_BOOM());
        break;
      case emojiCodes.boom:
        dispatch(INCREASE_BOOM());
        dispatch(RESET_SMILEY());
        break;
      case emojiCodes.cyclone:
        dispatch(RESET_SMILEY());
        dispatch(RESET_BOOM());
        break;
      default:
        break;
    }
    dispatch(LAST_EMOJI(props.src));
  }
  /**
   * Function for calculation of Card neighbours when Cyclone Card is revealed
   * @returns {void}
   */
  function handleCyclone() {
    let indices = getIndicesOfNeighbours(index, 6);
    let neighbourPos = neighboursSelector;
    const nSmileys = indices.filter((e) =>
      neighbourPos.smiley.includes(e)
    ).length;
    const nBooms = indices.filter((e) => neighbourPos.boom.includes(e)).length;
    handleNeighbours({ smiley: nSmileys, boom: nBooms });
  }
  /**
   * Handle for Card click
   * @returns {void}
   */
  function cardClick() {
    handleisClicked(true);
    if (!isOpened) {
      dispatch(IS_TRANSITION(true));
      dispatch(ADD_OPENED(index));
      checkEmoji(children.props);
    }
  }
  /**
   * Hook for changing open state on reset of the game (resets states)
   */
  useEffect(() => {
    if (!openedSelector.includes(index)) {
      handleShowBody(false);
      handleNeighbours({});
      handleisClicked(false);
    }
  }, [openedSelector]);
  function addSmoothingTimeout(fn) {
    setTimeout(() => fn(), 500);
  }
  /**
   * Handle for Card transition end upon clicking on it
   * @returns {void}
   */
  function onTransitionEnd() {
    if (isClicked) {
      handleShowBody(true);
      dispatch(IS_TRANSITION(false));
      addSmoothingTimeout(() => {
        if (children.props.src == emojiCodes.cyclone) {
          handleCyclone();
          handleShowBody(false);
        }
      });
    }
  }
  /**
   *  Persisting stored cards on mount
   */
  useEffect(() => {
    if (isOpened) {
      addSmoothingTimeout(cardClick);
    }
  }, []);
  /**
   * Render function
   */
  return (
    <div
      onTransitionEnd={() => onTransitionEnd()}
      onClick={cardClick}
      className={`card ${isClicked ? "open" : ""}`}
    >
      {Object.values(neighbours).length ? (
        <div className="cyclone">
          <div>
            {neighbours.smiley}
            <EmojiComponent src={emojiCodes.smiley}></EmojiComponent>
          </div>
          <div>
            {neighbours.boom}
            <EmojiComponent src={emojiCodes.boom}></EmojiComponent>
          </div>
        </div>
      ) : (
        ""
      )}
      {showBody ? children : ""}
    </div>
  );
}

export default Card;
