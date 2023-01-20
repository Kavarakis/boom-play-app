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
  // Redux Selectors:
  const smileysState = useSelector(selectSmileys);
  const boomsState = useSelector(selectBooms);
  const isTransition = useSelector(selectTransition);

  useEffect(() => initLocalStorage(), []);

  useEffect(() => {
    if (!isTransition) {
      handleSmileys(smileysState);
      handleBooms(boomsState);
      if (smileysState == 3) {
        handleWin(true);
      }
      if (boomsState == 2) {
        handleDefeat(true);
      }
    }
  }, [isTransition]);
  return (
    <div className="container">
      <main>
        <div>
          <button
            onClick={() => {
              clearLocalStorage();
              window.location.reload(true);
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
        <BoardComponent end={win || defeat} />
      </main>
    </div>
  );
}

export default App;
