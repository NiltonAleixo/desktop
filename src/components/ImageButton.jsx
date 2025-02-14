import React from "react";
import "./ImageButton.css";

const ImageButton = ({ defaultImage, selectedImage, onClick, isSelected, label }) => {
  return (
    <button
      className={`image-button ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      aria-label={label}
    >
      <img src={isSelected ? selectedImage : defaultImage} alt={label} />
    </button>
  );
};

export default ImageButton;
