import { emojiCodes } from "../../utils/utils";

function Emoji(props) {
  const { src = emojiCodes.default } = props;
  return <span>{src}</span>;
}

export default Emoji;
