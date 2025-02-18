import React, { useEffect, useState } from "react";
import "./ModalRecursos.css";

const ModalRecursos = ({ categoria, onClose }) => {
  const [recursos, setRecursos] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [subcategoriasComRecursos, setSubcategoriasComRecursos] = useState(new Set()); // Subcategorias ativas
  const [expandedSubcategoria, setExpandedSubcategoria] = useState(null);

  useEffect(() => {
    if (categoria?.id) {
      window.api.invoke("getRecursosByCategoria", categoria.id)
        .then((result) => {
          setRecursos(result);

          // Criamos um conjunto de subcategorias que têm recursos na coleção
          const subcategoriasAtivas = new Set(result.map(recurso => recurso.subcategoria_id));
          setSubcategoriasComRecursos(subcategoriasAtivas);
        })
        .catch((err) => console.error("Erro ao buscar recursos:", err));

      window.api.invoke("getSubcategorias", categoria.id)
        .then((result) => setSubcategorias(result))
        .catch((err) => console.error("Erro ao buscar subcategorias:", err));
    }
  }, [categoria]);

  const handleSubcategoriaClick = (subcategoria) => {
    if (subcategoriasComRecursos.has(subcategoria.id)) {
      setExpandedSubcategoria((prev) => (prev === subcategoria ? null : subcategoria));
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* Botões Laterais */}
        <div className="botoes-laterais">
          {subcategorias.map((sub, index) => {
            const isAtivo = subcategoriasComRecursos.has(sub.id);
            const imagemBotao = isAtivo
              ? `${process.env.PUBLIC_URL}/images/botoes/sub${index + 1}.2.png`
              : `${process.env.PUBLIC_URL}/images/botoes/sub${index + 1}.png`;

            return (
              <button
                key={sub.id || index}
                className={`botao-lateral ${expandedSubcategoria === sub ? "ativo" : ""}`}
                onClick={() => handleSubcategoriaClick(sub)}
              >
                <img src={imagemBotao} alt={sub.nome} />
              </button>
            );
          })}
        </div>

        {/* Lista de Recursos */}
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
