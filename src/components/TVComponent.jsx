// src/components/TVComponent.jsx
import React from "react";

const TVComponent = ({ tvHoverState, onHover, onLeave, onClick }) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/images/Sabichinhos/tvState${tvHoverState}.png`}
      alt="TV"
      className="tv-icon"
      onMouseEnter={() => onHover(1)}
      onMouseLeave={() => onLeave(0)}
      onClick={onClick}
    />
  );
};

export default TVComponent;