import "./Home.css";
import { useState } from "react";

import { PaletaLista } from "../../components/PaletaLista/PaletaLista";
import { Header } from "../../components/Header/Header";
import { AdicionarEditarPaletaModal } from "../../components/AdicionarEditarPaletaModal/AdicionarEditarPaletaModal";

export function Home() {
  const [canShowAdicionarPaletaModal, setCanShowAdicionarPaletaModal] =
    useState(false);

  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState()

  return (
    <div className="Home">
      <Header createPaleta={() => setCanShowAdicionarPaletaModal(true)} />

      <div className="Home__container">
        <PaletaLista paletaCriada={paletaParaAdicionar}/>

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
