import "./Home.css";

import { PaletaLista } from "../../components/PaletaLista/PaletaLista";
import { Header } from "../../components/Header/Header";
import { AdicionarPaletaModal } from "../../components/AdicionarPaletaModal/AdicionarPaletaModal";

export function Home() {
  return (
    <div className="Home">
      <Header />

      <div className="Home__container">
        <PaletaLista />
        <AdicionarPaletaModal />
      </div>
    </div>
  );
}
