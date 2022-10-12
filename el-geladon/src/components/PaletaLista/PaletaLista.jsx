import { useEffect, useState } from "react";
import { api } from "../../utils/api/api";
import { PaletaListaItem } from "../PaletaListaItem/PaletaListaItem";
import "./PaletaLista.css";
import { PaletaDetalhesModal } from "../PaletaDetalhesModal/PaletaDetalhesModal";

export function PaletaLista({ paletaCriada, mode }) {
  const [paletas, setPaletas] = useState([]);

  const [paletaSelecionada, setPaletaSelecionada] = useState({});

  const [paletaModal, setPaletaModal] = useState(false);

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

  const getPaletas = async () => {
    const response = await api.getAllPaletas();
    setPaletas(response);
  };

  const getPaletaById = async (paletaId) => {
    const response = await api.getPaletaById(paletaId);
    setPaletaModal(response);
  };

  const adicionaPaletaNaLista = (paleta) => {
    const lista = [...paletas, paleta];
    setPaletas(lista);
  };

  useEffect(() => {
    if (paletaCriada) adicionaPaletaNaLista(paletaCriada);
  }, [paletaCriada]);

  useEffect(() => {
    getPaletas();
  }, []);

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <PaletaListaItem
          mode={mode}
          key={`PaletaListaItem-${index}`}
          paleta={paleta}
          quantidadeSelecionada={paletaSelecionada[index]}
          index={index}
          onRemove={(index) => removerPaleta(index)}
          onAdd={(index) => adicionarPaleta(index)}
          clickItem={(paletaId) => getPaletaById(paletaId)}
        />
      ))}

      {paletaModal && (
        <PaletaDetalhesModal
          paleta={paletaModal}
          closeModal={() => setPaletaModal(false)}
        />
      )}
    </div>
  );
}
