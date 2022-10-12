import "./Home.css";
import { useState } from "react";

import { PaletaLista } from "../../components/PaletaLista/PaletaLista";
import { Header } from "../../components/Header/Header";
import { AdicionarEditarPaletaModal } from "../../components/AdicionarEditarPaletaModal/AdicionarEditarPaletaModal";
import { ActionMode } from "../../constants/index";

export function Home() {
  const [canShowAdicionarPaletaModal, setCanShowAdicionarPaletaModal] =
    useState(false);

  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  return (
    <div className="Home">
      <Header
        mode={modoAtual}
        createPaleta={() => setCanShowAdicionarPaletaModal(true)}
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
      />

      <div className="Home__container">
        <PaletaLista mode={modoAtual} paletaCriada={paletaParaAdicionar} />

        {canShowAdicionarPaletaModal && (
          <AdicionarEditarPaletaModal
            closeModal={() => setCanShowAdicionarPaletaModal(false)}
            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
          />
        )}
      </div>
    </div>
  );
}
