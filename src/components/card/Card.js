import { useState, React } from "react";
import "./card.scss";

function Card(props) {
  const { clicked, children } = props;
  const [isClicked, handleisClicked] = useState(false);
  const [showBody, handleShowBody] = useState(false);

  function CardClick() {
    handleisClicked(true);
    clicked(true);
  }

  return (
    <div
      onTransitionEnd={() => {
        handleShowBody(true);
        clicked(false);
      }}
      onClick={CardClick}
      className={`card ${isClicked ? "open" : ""}`}
    >
      {showBody ? children : ""}
    </div>
  );
}

export default Card;
