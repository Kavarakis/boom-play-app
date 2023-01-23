import { React, useEffect, useState } from "react";
import { BoardComponent } from "./components";
import { useSelector } from "react-redux";
import {
  selectBooms,
  selectSmileys,
  selectTransition,
} from "./redux/reducers/gameCountReducer";
import { clearLocalStorage, initLocalStorage } from "./localStorage";
import "./App.scss";

function App() {
  // States:
  const [win, handleWin] = useState(false);
  const [defeat, handleDefeat] = useState(false);
  const [smileys, handleSmileys] = useState(0);
  const [booms, handleBooms] = useState(0);
  const [reset, handleReset] = useState(false);

  /**
   * Resets internal component states
   * @returns {void}
   */
  function resetStates() {
    handleWin(false);
    handleDefeat(false);
    handleSmileys(0);
    handleBooms(0);
  }
  // Redux Selectors:
  const smileysState = useSelector(selectSmileys);
  const boomsState = useSelector(selectBooms);
  const isTransition = useSelector(selectTransition);

  /**
   * Persist redux store to localStorage
   */
  useEffect(() => initLocalStorage(), []);

  /**
   * Hook for monitoring each move
   */
  useEffect(() => {
    if (!isTransition) {
      handleSmileys(smileysState);
      handleBooms(boomsState);
      handleReset(false);
      if (smileysState == 3) {
        handleWin(true);
      }
      if (boomsState == 2) {
        handleDefeat(true);
      }
      if (reset) {
        handleReset(false);
      }
    }
  }, [isTransition]);
  /**
   * Hook for triggering reset of internal component states
   */
  useEffect(() => {
    if (reset) {
      resetStates();
    }
  }, [reset]);

  /*
   * Render function
   */
  return (
    <div className="container">
      <main>
        <div>
          <button
            onClick={() => {
              clearLocalStorage();
              handleReset(true);
            }}
          >
            New Game
          </button>
        </div>
        {win ? (
          <div>
            <h1>YOU WIN!</h1>
          </div>
        ) : (
          ""
        )}
        {defeat ? (
          <div>
            <h1>YOU LOSE!</h1>
          </div>
        ) : (
          ""
        )}
        {!win && !defeat ? (
          <div>
            <h3>Smileys: {smileys}</h3>
            <h3>Booms: {booms}</h3>
          </div>
        ) : (
          ""
        )}
        <BoardComponent end={win || defeat} isReset={reset} />
      </main>
    </div>
  );
}

export default App;
