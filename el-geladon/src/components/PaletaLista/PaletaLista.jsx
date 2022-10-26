import { useEffect, useState, useCallback } from "react";
import { api } from "../../utils/api/api";
import { PaletaListaItem } from "../PaletaListaItem/PaletaListaItem";
import "./PaletaLista.css";
import { PaletaDetalhesModal } from "../PaletaDetalhesModal/PaletaDetalhesModal";
import { ActionMode } from "../../constants";

export function PaletaLista({
  paletaCriada,
  paletaEditada,
  mode,
  updatePaLeta,
  deletePaleta,
  paletaRemovida,
}) {
  const selecionadas = JSON.parse(localStorage.getItem("selecionadas")) ?? {};

  const [paletas, setPaletas] = useState([]);

  const [paletaSelecionada, setPaletaSelecionada] = useState(selecionadas);

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

  const setSelecionadas = useCallback(() => {
    if (!paletas.length) return;

    const entries = Object.entries(paletaSelecionada);
    const sacola = entries.map((arr) => ({
      paletaId: paletas[arr[0]]._id,
      quantidade: arr[1],
    }));

    localStorage.setItem("sacola", JSON.stringify(sacola));
    localStorage.setItem("selecionadas", JSON.stringify(paletaSelecionada));
  });

  const getPaletas = async () => {
    const response = await api.getAllPaletas();
    setPaletas(response);
  };

  const getPaletaById = async (paletaId) => {
    const response = await api.getPaletaById(paletaId);

    const mapper = {
      [ActionMode.NORMAL]: () => setPaletaModal(response),
      [ActionMode.ATUALIZAR]: () => updatePaLeta(response),
      [ActionMode.DELETAR]: () => deletePaleta(response),
    };

    mapper[mode]();
  };

  const adicionaPaletaNaLista = useCallback(
    (paleta) => {
      const lista = [...paletas, paleta];
      setPaletas(lista);
    },
    [paletas]
  );

  useEffect(() => {
    setSelecionadas();
  }, [setSelecionadas, paletaSelecionada]);

  useEffect(() => {
    if (
      paletaCriada &&
      !paletas.map(({ id }) => id).includes(paletaCriada.id)
    ) {
      adicionaPaletaNaLista(paletaCriada);
    }
  }, [paletaCriada, adicionaPaletaNaLista, paletas]);

  useEffect(() => {
    getPaletas();
  }, [paletaEditada, paletaRemovida, paletas]);

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
