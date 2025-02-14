// src/components/VideoModal.jsx
import React from "react";

const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="video-modal" onClick={onClose}>
      <div className="video-content">
        <h2>Vídeos</h2>
        <p>Aqui entrarão os vídeos.</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default VideoModal;