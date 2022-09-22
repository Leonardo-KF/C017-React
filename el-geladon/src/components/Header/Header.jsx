import "./Header.css";

import sacola from "../../assets/icons/sacola.svg";
import logo from "../../assets/logo.svg";

export function Header() {
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
        <div className="Header__opcoes Opcoes"></div>
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
  );
}
