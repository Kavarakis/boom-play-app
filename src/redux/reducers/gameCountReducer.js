import { createSlice } from "@reduxjs/toolkit";
import { emojiCodes } from "../../utils/utils";
// Reducer:

export const initialState = {
  smileys: 0,
  lastEmoji: "",
  booms: 0,
  isTransition: false,
  neighbours: { smiley: [], boom: [] },
  openedCards: [],
  grid: [],
  // wins: 0,
  // loss: 0,
};
export const GameReducer = createSlice({
  name: "gameCounter",
  initialState,

  reducers: {
    INCREASE_SMILEY: (state) => {
      if (state.lastEmoji == emojiCodes.smiley || state.smileys == 0) {
        state.smileys += 1;
      }
    },
    INCREASE_BOOM: (state) => {
      if (state.lastEmoji == emojiCodes.boom || state.booms == 0) {
        state.booms += 1;
      }
    },
    RESET_SMILEY: (state) => {
      state.smileys = 0;
    },
    RESET_BOOM: (state) => {
      state.booms = 0;
    },
    LAST_EMOJI: (state, action) => {
      state.lastEmoji = action.payload;
    },
    RESET_LAST_EMOJI: (state) => {
      state.lastEmoji = "";
    },
    IS_TRANSITION: (state, action) => {
      state.isTransition = action.payload;
    },
    SET_NEIGHBOURS: (state, action) => {
      state.neighbours = action.payload;
    },
    ADD_OPENED: (state, action) => {
      state.openedCards.push(action.payload);
    },
    RESET_OPENED: (state) => {
      state.openedCards = [];
    },
    SET_GRID: (state, action) => {
      state.grid = action.payload;
    },
    RESET_GRID: (state) => {
      state.grid = [];
    },
    // ADD_WIN: (state) => {
    //   state.wins += 1;
    // },
    // ADD_LOSS: (state) => {
    //   state.loss += 1;
    // },
  },
});
// Actions:
export const {
  INCREASE_SMILEY,
  INCREASE_BOOM,
  RESET_SMILEY,
  RESET_BOOM,
  LAST_EMOJI,
  IS_TRANSITION,
  SET_NEIGHBOURS,
  ADD_OPENED,
  RESET_OPENED,
  SET_GRID,
  RESET_LAST_EMOJI,
  RESET_GRID,
  // ADD_LOSS,
  // ADD_WIN,
} = GameReducer.actions;
// Selectors:
export const selectLastEmoji = (state) => state.gameCounter.lastEmoji;
export const selectSmileys = (state) => state.gameCounter.smileys;
export const selectBooms = (state) => state.gameCounter.booms;
export const selectTransition = (state) => state.gameCounter.isTransition;
export const selectNeighbours = (state) => state.gameCounter.neighbours;
export const selectOpened = (state) => state.gameCounter.openedCards;
export const selectGrid = (state) => state.gameCounter.grid;
// export const selectWins = (state) => state.gameCounter.wins;
// export const selectLoss = (state) => state.gameCounter.loss;
export default GameReducer.reducer;
