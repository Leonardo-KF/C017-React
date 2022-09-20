import "./PaletaLista.css";
import { paletas } from "../../mocks/paletas";
import { useState } from "react";

export function PaletaLista() {
  const [paletaSelecionada, setPaletaSelecionada] = useState({});

  const adicionarPaleta = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1,
    };

    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };

  const removerPaleta = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) - 1,
    };

    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };

  const removeButton = (canReader, index) =>
    Boolean(canReader) && (
      <button className="Acoes__remover" onClick={() => removerPaleta(index)}>
        remover
      </button>
    );

  const badgeCounter = (canReader, index) =>
    Boolean(canReader) && (
      <span className="PaletaListaItem__badge">{paletaSelecionada[index]}</span>
    );

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <div className="PaletaListaItem" key={`PaletaListaItem-${index}`}>
          {badgeCounter(paletaSelecionada[index], index)}
          <div>
            <div className="PaletaListaItem__titulo">{paleta.titulo}</div>
            <div className="PaletaListaItem__preco">
              R$ {paleta.preco.toFixed(2)}
            </div>
            <div className="PaletaListaItem__descricao">{paleta.descricao}</div>
            <div className="PaletaListaItem__acoes Acoes">
              <button
                className={`Acoes__adicionar ${
                  !paletaSelecionada[index] && "Acoes__adicionar--preencher"
                }`}
                onClick={() => adicionarPaleta(index)}
              >
                adicionar
              </button>

              {removeButton(paletaSelecionada[index], index)}
            </div>
          </div>
          <img
            className="PaletaListaItem__foto"
            src={paleta.foto}
            alt={`Paleta de ${paleta.sabor}`}
          />
        </div>
      ))}
    </div>
  );
}
