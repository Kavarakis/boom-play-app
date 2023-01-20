import { configureStore } from "@reduxjs/toolkit";
import gameCountReducer, { initialState } from "./reducers/gameCountReducer";
function getStateFromLocalStorage() {
  const state = JSON.parse(window.localStorage.getItem("store"));
  if (state) {
    return state;
  }
  return initialState;
}
export default configureStore({
  reducer: {
    gameCounter: gameCountReducer,
  },
  preloadedState: {
    gameCounter: getStateFromLocalStorage(),
  },
});
