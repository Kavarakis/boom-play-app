import App from "./App";
import { renderWithProviders } from "./utils/test-utils";
import { act, fireEvent } from "@testing-library/react";
import { emojiCodes } from "./utils";
describe("App Component tests", () => {
  test("Render App", async () => {
    const container = await act(async () => renderWithProviders(<App></App>));
    let root = container.baseElement.getElementsByClassName("container");
    expect(root.length).toBe(1);
  });

  test("Check header", async () => {
    const container = await act(async () => renderWithProviders(<App></App>));
    expect(container.findByRole("button")).toBeDefined();
    expect(container.baseElement.textContent).not.toContain("YOU WIN!");
    expect(container.baseElement.textContent).not.toContain("YOU LOSE!");
  });
  test("Check score", async () => {
    const container = await act(async () => renderWithProviders(<App></App>));
    expect(container.baseElement.textContent).toContain("Smileys: 0");
    expect(container.baseElement.textContent).toContain("Booms: 0");
  });
  test("Check persisted score", async () => {
    let initialState = {
      smileys: 2,
      lastEmoji: "",
      booms: 0,
      isTransition: false,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [],
      grid: [],
    };

    const container = await act(async () =>
      renderWithProviders(<App />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    expect(container.baseElement.textContent).toContain(
      `Smileys: ${initialState.smileys}`
    );
    expect(container.baseElement.textContent).toContain(
      `Booms: ${initialState.booms}`
    );
  });
  test("Check persisted score - win", async () => {
    let initialState = {
      smileys: 3,
      lastEmoji: "",
      booms: 0,
      isTransition: false,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [],
      grid: [],
    };

    const container = await act(async () =>
      renderWithProviders(<App />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    expect(container.baseElement.textContent).not.toContain(
      `Smileys: ${initialState.smileys}`
    );
    expect(container.baseElement.textContent).not.toContain(
      `Booms: ${initialState.booms}`
    );
    expect(container.baseElement.textContent).toContain("YOU WIN!");
  });
  test("Check persisted score - defeat", async () => {
    let initialState = {
      smileys: 0,
      lastEmoji: "",
      booms: 2,
      isTransition: false,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [],
      grid: [],
    };

    const container = await act(async () =>
      renderWithProviders(<App />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    expect(container.baseElement.textContent).not.toContain(
      `Smileys: ${initialState.smileys}`
    );
    expect(container.baseElement.textContent).not.toContain(
      `Booms: ${initialState.booms}`
    );
    expect(container.baseElement.textContent).toContain("YOU LOSE!");
  });

  test("Check end signal - win", async () => {
    let initialState = {
      smileys: 3,
      lastEmoji: "",

      booms: 0,
      isTransition: false,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [],
      grid: [],
    };

    const container = await act(async () =>
      renderWithProviders(<App />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    const [board] =
      container.baseElement.getElementsByClassName("block-clicking");

    expect(board).toBeDefined();
  });

  test("Check end signal - defeat", async () => {
    let initialState = {
      smileys: 0,
      lastEmoji: "",

      booms: 2,
      isTransition: false,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [],
      grid: [],
    };

    const container = await act(async () =>
      renderWithProviders(<App />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    const [board] =
      container.baseElement.getElementsByClassName("block-clicking");

    expect(board).toBeDefined();
  });

  test("Check behaviour during transition", async () => {
    let initialState = {
      smileys: 0,
      lastEmoji: "",

      booms: 2,
      isTransition: true,
      neighbours: {
        smiley: [],
        boom: [],
      },
      openedCards: [],
      grid: [],
    };
    const container = await act(async () =>
      renderWithProviders(<App />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    expect(container.baseElement.textContent).not.toContain("YOU LOSE!");
    expect(container.baseElement.textContent).toContain("Booms: 0");
  });

  test("Check button - new game", async () => {
    let initialState = {
      smileys: 0,
      lastEmoji: "",
      booms: 0,
      isTransition: false,
      neighbours: { smiley: [], boom: [] },
      openedCards: [],
      grid: Array(6 * 6).fill(emojiCodes.smiley),
    };
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    const container = await act(async () =>
      renderWithProviders(<App />, {
        preloadedState: { gameCounter: initialState },
      })
    );
    const cards = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.click(cards[1]));
    await act(async () => fireEvent.transitionEnd(cards[1]));
    await act(async () => jest.runAllTimers());

    expect(container.baseElement.textContent).toContain(emojiCodes.smiley);

    const button = container.getByRole("button");
    await act(async () => fireEvent.click(button));
    let after = container.baseElement.textContent;
    expect(container.store.getState().gameCounter.smileys).toBe(0);
    expect(container.store.getState().gameCounter.lastEmoji).toBe("");
    expect(container.store.getState().gameCounter.openedCards.length).toBe(0);
    expect(container.store.getState().gameCounter.grid.length).toBe(36);
    jest.useRealTimers();
  });
});
