import { configureStore } from "@reduxjs/toolkit";
import gameCountReducer from "./reducers/gameCountReducer";

export default configureStore({
  reducer: {
    gameCounter: gameCountReducer,
  },
});
