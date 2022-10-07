import "./Home.css";
import { useState } from "react";

import { PaletaLista } from "../../components/PaletaLista/PaletaLista";
import { Header } from "../../components/Header/Header";
import { AdicionarPaletaModal } from "../../components/AdicionarPaletaModal/AdicionarPaletaModal";

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
          <AdicionarPaletaModal
            closeModal={() => setCanShowAdicionarPaletaModal(false)}
            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
          />
        )}
      </div>
    </div>
  );
}
