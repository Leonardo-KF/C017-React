import { useState } from "react";
import "./Home.css";

import { AdicionarEditarPaletaModal } from "../../components/AdicionarEditarPaletaModal/AdicionarEditarPaletaModal";
import { DeletarPaletaModal } from "../../components/DeletarPaletaModal/DeletarPaletaModal";
import { SacolaModal } from "../../components/SacolaModal/SacolaModal";
import { Header } from "../../components/Header/Header";
import { PaletaLista } from "../../components/PaletaLista/PaletaLista";
import { ActionMode } from "../../constants/index";
import { api } from "../../utils/api/api";

export function Home() {
  const [canShowAdicionarPaletaModal, setCanShowAdicionarPaletaModal] =
    useState(false);

  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const [paletaParaEditar, setPaletaParaEditar] = useState();

  const [paletaEditada, setPaletaEditada] = useState();

  const [paletaParaDeletar, setPaletaParaDeletar] = useState();

  const [paletaRemovida, setPaletaRemovida] = useState();

  const [canOpenBag, setCanOpenBag] = useState();

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const handleUpdatePaleta = (paletaToUpdate) => {
    setPaletaParaEditar(paletaToUpdate);
    setCanShowAdicionarPaletaModal(true);
  };

  const handleDeletePaleta = (paletaToDelete) => {
    setPaletaParaDeletar(paletaToDelete);
  };

  const handleCloseModal = () => {
    setCanShowAdicionarPaletaModal(false);
    setPaletaParaAdicionar();
    setPaletaParaEditar();
    setPaletaParaDeletar();
    setModoAtual(ActionMode.NORMAL);
  };

  const openSacola = async () => {
    const list = JSON.parse(localStorage.getItem("sacola"));
    const sacola = list.filter((i) => i.quantidade > 0);
    await api.createSacola(sacola);
    setCanOpenBag(true);
  };

  return (
    <div className="Home">
      <Header
        mode={modoAtual}
        createPaleta={() => setCanShowAdicionarPaletaModal(true)}
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
        deletePaleta={() => handleActions(ActionMode.DELETAR)}
        openBag={openSacola}
      />

      <div className="Home__container">
        <PaletaLista
          mode={modoAtual}
          paletaCriada={paletaParaAdicionar}
          updatePaLeta={handleUpdatePaleta}
          deletePaleta={handleDeletePaleta}
          paletaEditada={paletaEditada}
          paletaRemovida={paletaRemovida}
        />

        {canShowAdicionarPaletaModal && (
          <AdicionarEditarPaletaModal
            mode={modoAtual}
            paletaToUpdate={paletaParaEditar}
            closeModal={handleCloseModal}
            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
            onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
          />
        )}

        {paletaParaDeletar && (
          <DeletarPaletaModal
            paletaParaDeletar={paletaParaDeletar}
            closeModal={handleCloseModal}
            onDeletePaleta={(paleta) => setPaletaRemovida(paleta)}
          />
        )}

        {canOpenBag && <SacolaModal closeModal={() => setCanOpenBag(false)} />}
      </div>
    </div>
  );
}
