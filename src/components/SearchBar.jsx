// src/components/SearchBar.jsx
import React from "react";

const SearchBar = ({ isOpen, searchTerm, onChange, onSearch, onClear }) => {
  return (
    <div className={`search-bar-container ${isOpen ? "open" : ""}`}>
      <img
        src={`${process.env.PUBLIC_URL}/images/Sabichinhos/barraBusca.png`}
        alt="Barra de Busca"
        className="barra-busca"
      />
      <div className="search-bar-content">
        <input
          type="text"
          placeholder="Digite sua pesquisa..."
          value={searchTerm}
          onChange={(e) => onChange(e.target.value)}
        />
        <button onClick={onSearch}>Pesquisar</button>
        <button onClick={onClear}>Limpar</button>
      </div>
    </div>
  );
};

export default SearchBar;
