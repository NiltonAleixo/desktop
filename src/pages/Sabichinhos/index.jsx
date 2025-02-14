import React, { useState, useEffect } from "react";
import ModalRecursos from "../../components/ModalRecursos";
import SearchBar from "../../components/SearchBar";
import VideoModal from "../../components/VideoModal";
import PanelButton from "../../components/PanelButton";
import "./Sabichinhos.css";

const backgrounds = [
  `${process.env.PUBLIC_URL}/images/Sabichinhos/bg1.png`,
  `${process.env.PUBLIC_URL}/images/Sabichinhos/bg2.png`,
  `${process.env.PUBLIC_URL}/images/Sabichinhos/bg3.png`,
  `${process.env.PUBLIC_URL}/images/Sabichinhos/bg4.png`,
  `${process.env.PUBLIC_URL}/images/Sabichinhos/bg5.png`
];

const buttons = [
  { id: 1, label: "Primeiros Cliques", categoria: "Primeiros Cliques", images: ["btPrimeirosCliques1.png", "btPrimeirosCliques2.png", "btPrimeirosCliques3.png"] },
  { id: 2, label: "Desafios", categoria: "Desafios", images: ["btDesafios1.png", "btDesafios2.png", "btDesafios3.png"] },
  { id: 3, label: "Mãos a Obra", categoria: "Mãos à Obra", images: ["btMaosAObra1.png", "btMaosAObra2.png", "btMaosAObra3.png"] },
  { id: 4, label: "Super Games", categoria: "Supergames", images: ["btSuperGames1.png", "btSuperGames2.png", "btSuperGames3.png"] },
  { id: 5, label: "Ferramentas", categoria: "Ferramentas", images: ["btFerramentas1.png", "btFerramentas2.png", "btFerramentas3.png"] },
  { id: 6, label: "Painel Interativo", categoria: "Painel Interativo", images: ["btPainel1.png", "btPainel2.png", "btPainel3.png"] },
];

const SabichinhosPage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalBackground, setModalBackground] = useState('');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [tvState, setTvState] = useState(0);
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackgroundImage(backgrounds[randomIndex]);
  }, []);

  const handleOpenModal = (categoria, buttonId) => {
    setSelectedCategory(categoria);
    setSelectedButton(buttonId);
    if (!modalBackground) {
      setModalBackground(`${process.env.PUBLIC_URL}/images/Sabichinhos/bgModal.png`);
    }
  };
  

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setSelectedButton(null);
    setTimeout(() => setModalBackground(''), 300);
  };

  return (
    <div className="sabichinhos-container" style={{ backgroundImage: `url(${modalBackground || backgroundImage})` }}>
      
      {/* Botões no topo da tela */}
      <div className="top-buttons">
        <img
          src={`${process.env.PUBLIC_URL}/images/Sabichinhos/botaoPesquisar.png`}
          alt="Pesquisar"
          className="icon search-icon"
          onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
        />
        <SearchBar 
          isOpen={isSearchBarOpen} 
          searchTerm={searchTerm} 
          onChange={setSearchTerm} 
          onSearch={() => console.log("Pesquisar por:", searchTerm)} 
          onClear={() => setSearchTerm("")} 
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/Sabichinhos/areaProfessor.png`}
          alt="Área do Professor"
          className="icon professor-icon"
        />
      </div>

      {/* Botão de som */}
      <img
        src={isSoundOn ? `${process.env.PUBLIC_URL}/images/Sabichinhos/somOn.png` : `${process.env.PUBLIC_URL}/images/Sabichinhos/somOff.png`}
        alt="Som"
        className="icon sound-icon"
        onClick={() => setIsSoundOn(!isSoundOn)}
      />

      {/* Ícone da Televisão */}
      <img
        src={`${process.env.PUBLIC_URL}/images/Sabichinhos/tvState${tvState}.png`}
        alt="TV"
        className="tv-icon"
        onMouseEnter={() => setTvState(1)} 
        onMouseLeave={() => setTvState(0)} 
        onClick={() => setVideoModalOpen(true)}
      />

      {/* Modal de Vídeos */}
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />

      {/* Painel Interativo */}
      <div className="painel-container">
        <img src={`${process.env.PUBLIC_URL}/images/Sabichinhos/basePainel.png`} alt="Base do Painel" className="painel-base" />
        <div className="botoes">
          {buttons.map((button) => (
            <PanelButton 
            key={button.id} 
            button={button} 
            selectedButton={selectedButton} 
            onOpenModal={handleOpenModal} 
          />
          ))}
        </div>
      </div>

      {/* Modal de Recursos */}
      {selectedCategory && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <img
              src={`${process.env.PUBLIC_URL}/images/Sabichinhos/modal.png`}
              alt="Modal"
              className="modal-image"
            />
            <div className="modal-content">
              <ModalRecursos categoria={selectedCategory} onClose={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SabichinhosPage;
