import React from "react";

const PanelButton = ({ button, selectedButton, onOpenModal }) => {
  const isSelected = selectedButton === button.id;

  return (
    <img
      src={`${process.env.PUBLIC_URL}/images/Sabichinhos/${isSelected ? button.images[2] : button.images[0]}`}
      alt={button.label}
      className="botao"
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.src = `${process.env.PUBLIC_URL}/images/Sabichinhos/${button.images[1]}`;
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.src = `${process.env.PUBLIC_URL}/images/Sabichinhos/${button.images[0]}`;
      }}
      onClick={() => onOpenModal(button.categoria, button.id)}
    />
  );
};

export default PanelButton;
