import { render, screen } from "@testing-library/react";
import { emojiCodes } from "../../utils";
import Emoji from "./Emoji";

describe("Emoji Component tests", () => {
  test("Render Emoji", async () => {
    render(<Emoji src={emojiCodes.smiley} />);
    let el = await screen.findAllByText(emojiCodes.smiley);
    expect(el).toBeDefined();
  });

  test("Render Emoji without src", async () => {
    render(<Emoji />);
    let el = await screen.findByText(emojiCodes.default);
    expect(el).toBeDefined();
  });
});
