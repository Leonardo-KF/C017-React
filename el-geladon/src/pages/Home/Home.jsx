import { useState } from "react";
import "./Home.css";

import { AdicionarEditarPaletaModal } from "../../components/AdicionarEditarPaletaModal/AdicionarEditarPaletaModal";
import { DeletarPaletaModal } from "../../components/DeletarPaletaModal/DeletarPaletaModal";
import { Header } from "../../components/Header/Header";
import { PaletaLista } from "../../components/PaletaLista/PaletaLista";
import { ActionMode } from "../../constants/index";

export function Home() {
  const [canShowAdicionarPaletaModal, setCanShowAdicionarPaletaModal] =
    useState(false);

  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const [paletaParaEditar, setPaletaParaEditar] = useState();

  const [paletaEditada, setPaletaEditada] = useState();

  const [paletaParaDeletar, setPaletaParaDeletar] = useState();

  const [paletaRemovida, setPaletaRemovida] = useState();

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

  return (
    <div className="Home">
      <Header
        mode={modoAtual}
        createPaleta={() => setCanShowAdicionarPaletaModal(true)}
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
        deletePaleta={() => handleActions(ActionMode.DELETAR)}
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
      </div>
    </div>
  );
}
