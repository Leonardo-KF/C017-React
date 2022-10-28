import "./SacolaModal.css";
import { Modal } from "../Modal/Modal";
import { api } from "../../utils/api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SacolaModal({ closeModal }) {
  const navigate = useNavigate();

  const [list, setList] = useState([]);

  const finishSacola = async () => {
    await api.finishSacola();
    navigate("/loading");
  };

  const handleClose = async () => {
    await api.finishSacola();
    closeModal();
  };

  const getLists = async () => {
    const paletaList = await api.getAllPaletas();
    const sacolaList = await api.getAllSacola();

    const findPaleta = (id) => {
      const paleta = paletaList.find((i) => i._id == id);
      return (paleta && paleta.titulo) ?? "";
    };

    if (Array.isArray(sacolaList)) {
      const newList = sacolaList.map(({ paletaId, quantidade }) => ({
        nome: findPaleta(paletaId),
        quantidade,
      }));
      setList(newList);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <Modal closeModal={handleClose}>
      <div className="SacolaModal">
        <h2>Paletas & Quantidades</h2>
        <div>
          {list.map((paleta, index) => (
            <div key={index}>
              {paleta.nome +
                ": " +
                paleta.quantidade +
                (paleta.quantidade == 1 ? " unidade" : " unidades")}
              <br />
              <br />
            </div>
          ))}
        </div>
        <div>
          <button onClick={finishSacola} className="SacolaModal__confirmar">
            Fechar Compra
          </button>
        </div>
      </div>
    </Modal>
  );
}
