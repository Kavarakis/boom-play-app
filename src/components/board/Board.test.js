import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { emojiCodes } from "../../utils";
import { renderWithProviders } from "../../utils/test-utils";
import Board from "./Board";

describe("Board Component tests", () => {
  test("Render board", async () => {
    const container = await act(async () => renderWithProviders(<Board />));
    let [board] = container.baseElement.getElementsByClassName("board-6x6");

    expect(board).toBeDefined();
  });

  test("Render cards inside board", async () => {
    const container = await act(async () => renderWithProviders(<Board />));
    let card = container.baseElement.getElementsByClassName("card");

    expect(card.length).toBe(36);
  });

  test("End signal", async () => {
    const container = await act(async () =>
      renderWithProviders(<Board end={true} />)
    );
    let base = container.baseElement.getElementsByClassName("block-clicking");
    expect(base.length).toBe(1);
  });

  test("Is transition signal", async () => {
    let initialState = {
      smileys: 0,
      lastEmoji: "",
      booms: 0,
      isTransition: true,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [],
      grid: [],
    };
    const container = await act(async () =>
      renderWithProviders(<Board />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    let base = container.baseElement.getElementsByClassName("block-clicking");
    expect(base.length).toBe(1);
  });

  test("check persisted grid", async () => {
    let initialState = {
      smileys: 0,
      lastEmoji: "",
      booms: 0,
      isTransition: true,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [],
      grid: Array(5 * 5).fill(emojiCodes.smiley),
    };
    const container = await act(async () =>
      renderWithProviders(<Board />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    let base = container.baseElement.getElementsByClassName("card");
    expect(base.length).toBe(25);
  });

  test("check persisted opened cards", async () => {
    let initialState = {
      smileys: 0,
      lastEmoji: "",
      booms: 0,
      isTransition: true,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [1, 2],
      grid: Array(6 * 6).fill(emojiCodes.smiley),
    };
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    const container = await act(async () =>
      renderWithProviders(<Board />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    await act(async () => jest.runAllTimers());

    let base = container.baseElement.getElementsByClassName("open");
    await act(async () => {
      for (let item of base) {
        fireEvent.transitionEnd(item);
      }
    });
    expect(base.length).toEqual(2);
    expect(container.baseElement.textContent).toEqual(
      emojiCodes.smiley + emojiCodes.smiley
    );

    jest.useRealTimers();
  });

  test("check consecutive smiley - game rule", async () => {
    let initialState = {
      smileys: 1,
      lastEmoji: emojiCodes.smiley,
      booms: 0,
      isTransition: true,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [],
      grid: Array(6 * 6).fill(emojiCodes.smiley),
    };
    const container = await act(async () =>
      renderWithProviders(<Board />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    const cards = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.click(cards[0]));
    expect(container.store.getState().gameCounter.smileys).toBe(2);
  });

  test("check not consecutive boom - game rule", async () => {
    let initialState = {
      smileys: 2,
      lastEmoji: emojiCodes.smiley,
      booms: 0,
      isTransition: true,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [],
      grid: Array(6 * 6).fill(emojiCodes.boom),
    };
    const container = await act(async () =>
      renderWithProviders(<Board />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    const cards = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.click(cards[0]));
    expect(container.store.getState().gameCounter.smileys).toBe(0);
    expect(container.store.getState().gameCounter.booms).toBe(1);
  });
});
