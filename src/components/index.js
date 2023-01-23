import React from "react";

export const CardComponent = React.lazy(() =>
  import(/* webpackChunkName: "CardComponent" */ "./card/Card")
);
export const EmojiComponent = React.lazy(() =>
  import(/* webpackChunkName: "EmojiComponent" */ "./emoji/Emoji")
);
export const BoardComponent = React.lazy(() =>
  import(/* webpackChunkName: "BoardComponent" */ "./board/Board")
);
