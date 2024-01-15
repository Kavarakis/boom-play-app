import { configureStore } from "@reduxjs/toolkit";
import gameCountReducer, { initialState } from "./reducers/gameCountReducer";
/**
 * This part is missing store object validator
 * which would check store object upon retrieval from local storage.
 * This would prevent malfunction from badly configure local storage objects...
 *
 */
function getStateFromLocalStorage() {
  const state = JSON.parse(window.localStorage.getItem("store"));
  if (state) {
    /**
     * TODO:
     * e.g. storeStateValidator(state);
     */
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
