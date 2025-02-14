import React, { useEffect, useState } from "react";
import "./ModalRecursos.css";

const ModalRecursos = ({ categoria, onClose }) => {
  const [recursos, setRecursos] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [expandedSubcategoria, setExpandedSubcategoria] = useState(null);

  useEffect(() => {
    if (categoria?.id) {
      // Buscar recursos da categoria
      window.api.invoke("getRecursosByCategoria", categoria.id)
        .then((result) => setRecursos(result))
        .catch((err) => console.error("Erro ao buscar recursos:", err));

      // Buscar subcategorias associadas
      window.api.invoke("getSubcategorias", categoria.id)
        .then((result) => setSubcategorias(result))
        .catch((err) => console.error("Erro ao buscar subcategorias:", err));
    }
  }, [categoria]);

  const handleSubcategoriaClick = (subcategoria) => {
    setExpandedSubcategoria((prev) => (prev === subcategoria ? null : subcategoria));
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{categoria?.nome || "Recursos"}</h2>

        <div className="subcategorias-container">
          {subcategorias.map((sub, index) => (
            <div
              key={sub.id || index}
              className={`subcategoria ${expandedSubcategoria === sub ? "expanded" : ""}`}
              onClick={() => handleSubcategoriaClick(sub)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/Sabichinhos/sub${index + 1}.png`}
                alt={sub.nome}
              />
              {expandedSubcategoria === sub && (
                <div className="subcategoria-nome">{sub.nome}</div>
              )}
            </div>
          ))}
        </div>

        {/* Listagem de recursos filtrada por subcategoria */}
        <div className="recursos-container">
          {recursos.length > 0 ? (
            <ul>
              {recursos
                .filter((recurso) => !expandedSubcategoria || recurso.subcategoria_id === expandedSubcategoria.id)
                .map((recurso) => (
                  <li key={recurso.id}>
                    <strong>{recurso.nome_recurso}</strong>
                    <p>
                      <a href={recurso.caminho} target="_blank" rel="noopener noreferrer">
                        Acessar Recurso
                      </a>
                    </p>
                  </li>
                ))}
            </ul>
          ) : (
            <p>Nenhum recurso encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalRecursos;
