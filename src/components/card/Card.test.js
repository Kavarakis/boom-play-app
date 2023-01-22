import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import { emojiCodes } from "../../utils";
import { renderWithProviders } from "../../utils/test-utils";
import Card from "./Card";
import { EmojiComponent } from "..";

describe("Card Component tests", () => {
  test("Check Card element", () => {
    const container = renderWithProviders(<Card></Card>);
    let card = container.baseElement.getElementsByClassName("card");
    expect(card.length).toBe(1);
  });

  test("Check click", async () => {
    const container = renderWithProviders(<Card></Card>);
    let [card] = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.click(card));
    expect(card).toHaveClass("open");
  });

  test("Check transition end without click", async () => {
    const container = renderWithProviders(<Card></Card>);
    let [card] = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.transitionEnd(card));
    expect(card).not.toHaveTextContent(emojiCodes.default);
  });
  test("Check transition end with click", async () => {
    const container = renderWithProviders(<Card></Card>);
    let [card] = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.click(card));
    await act(async () => fireEvent.transitionEnd(card));
    expect(card).toHaveTextContent(emojiCodes.default);
  });
  test("Check Smiley behaviour", async () => {
    let initialState = {
      smileys: 0,
      lastEmoji: "",
      booms: 0,
      isTransition: false,
      neighbours: {},
      openedCards: [],
      grid: [],
    };
    const container = renderWithProviders(
      <Card>
        <EmojiComponent src={emojiCodes.smiley} />
      </Card>,
      { preloadedState: { gameCounter: initialState } }
    );
    let [card] = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.click(card));
    await act(async () => fireEvent.transitionEnd(card));

    expect(card).toHaveTextContent(emojiCodes.smiley);
    expect(card).toHaveClass("open");
  });

  test("Check Boom behaviour", async () => {
    let initialState = {
      smileys: 0,
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
    const container = renderWithProviders(
      <Card>
        <EmojiComponent src={emojiCodes.boom} />
      </Card>,
      { preloadedState: { gameCounter: initialState } }
    );
    let [card] = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.click(card));
    await act(async () => fireEvent.transitionEnd(card));

    expect(card).toHaveTextContent(emojiCodes.boom);
    expect(card).toHaveClass("open");
  });

  test("Check Cyclone behaviour", async () => {
    let initialState = {
      smileys: 0,
      lastEmoji: emojiCodes.cyclone,
      booms: 0,
      isTransition: false,
      neighbours: {
        smiley: [6, 7],
        boom: [1],
      },
      openedCards: [],
      grid: [],
    };
    const container = renderWithProviders(
      <Card>
        <EmojiComponent src={emojiCodes.cyclone} />
      </Card>,
      { preloadedState: { gameCounter: initialState } }
    );
    let [card] = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.click(card));
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    await act(async () => fireEvent.transitionEnd(card));
    expect(card).toHaveClass("open");
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(card).toHaveTextContent(emojiCodes.cyclone);
    await act(async () => jest.runAllTimers());
    expect(card).toHaveTextContent(emojiCodes.smiley);
    expect(card).toHaveTextContent(emojiCodes.boom);
    jest.useRealTimers();
  });

  test("Check Cyclone neighbour behaviour", async () => {
    let initialState = {
      smileys: 0,
      lastEmoji: emojiCodes.cyclone,
      booms: 0,
      isTransition: false,
      neighbours: {
        smiley: [7, 13],
        boom: [6],
      },
      openedCards: [],
      grid: [],
    };
    const container = renderWithProviders(
      <Card index={12}>
        <EmojiComponent src={emojiCodes.cyclone} />
      </Card>,
      { preloadedState: { gameCounter: initialState } }
    );
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    let [card] = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.click(card));
    expect(card).toHaveClass("open");
    await act(async () => fireEvent.transitionEnd(card));

    expect(card).toHaveTextContent(emojiCodes.cyclone);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    await act(async () => jest.runAllTimers());
    expect(card).toHaveTextContent(emojiCodes.smiley);
    expect(card).toHaveTextContent(emojiCodes.boom);
    expect(card).toHaveTextContent("2");
    expect(card).toHaveTextContent("1");
    jest.useRealTimers();
  });

  test("Check Cyclone behaviour without click", async () => {
    const container = renderWithProviders(
      <Card>
        <EmojiComponent src={emojiCodes.cyclone} />
      </Card>
    );
    let [card] = container.baseElement.getElementsByClassName("card");
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    expect(setTimeout).toHaveBeenCalledTimes(0);
    await act(async () => fireEvent.transitionEnd(card));
    await act(async () => jest.runAllTimers());

    expect(card).not.toHaveTextContent(emojiCodes.cyclone);
    expect(card).not.toHaveClass("open");
    jest.useRealTimers();
  });

  test("check persisted opened behaviour", async () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    const container = renderWithProviders(<Card isOpened={true} />);
    await act(async () => jest.runAllTimers());
    let [card] = container.baseElement.getElementsByClassName("card");
    await act(async () => fireEvent.transitionEnd(card));
    expect(card).toHaveClass("open");
    expect(card).toHaveTextContent(emojiCodes.default);
    jest.useRealTimers();
  });
});
