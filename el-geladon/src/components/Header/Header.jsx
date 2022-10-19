import "./Header.css";

import { ActionMode } from "../../constants/index";

import sacola from "../../assets/icons/sacola.svg";
import logo from "../../assets/logo.svg";
import paleta from "../../assets/icons/paleta.svg";
import atualizar from "../../assets/icons/atualizar.svg";
import deletar from "../../assets/icons/deletar.svg";

export function Header({ createPaleta, updatePaleta, mode, deletePaleta }) {
  return (
    <div className="Header">
      <div className="row">
        <div className="Header__logo Logo">
          <img
            src={logo}
            width="70px"
            alt="Logo do El Geladon"
            className="Logo__icone"
          />
          <span className="Logo__titulo">El Geladon</span>
        </div>
        <div className="Header__opcoes Opcoes">
          <button
            type="button"
            className={`Opcoes__paleta Paleta ${
              mode === ActionMode.ATUALIZAR && "Paleta--ativa"
            }`}
            onClick={() => updatePaleta()}
          >
            <img
              src={atualizar}
              alt="Editar paleta"
              className="Paleta__icone"
              width="40px"
            />
          </button>

          <button
            type="button"
            className={`Opcoes__paleta Paleta ${
              mode === ActionMode.DELETAR && "Paleta--deletar"
            }`}
            onClick={() => deletePaleta()}
          >
            <img
              src={deletar}
              alt="Deletar paleta"
              className="Paleta__icone"
              width="40px"
            />
          </button>

          <button
            type="button"
            className="Opcoes__paleta Paleta"
            onClick={() => createPaleta()}
          >
            <img
              src={paleta}
              alt="Adicionar paleta"
              className="Paleta__icone"
              width="40px"
            />
          </button>

          <div className="Opcoes__sacola Sacola">
            <img
              src={sacola}
              alt="Sacola de Compras"
              width="40px"
              className="Sacola__icone"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
