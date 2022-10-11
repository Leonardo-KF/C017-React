import "./AdicionarEditarPaletaModal.css";
import { Modal } from "../Modal/Modal";
import { useState, useEffect } from "react";
import { api } from "../../utils/api/api";

export function AdicionarEditarPaletaModal({ closeModal, onCreatePaleta }) {
  const form = {
    titulo: "",
    preco: "",
    descricao: "",
    foto: "",
  };

  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const createPaleta = async () => {
    const { titulo, preco, descricao, foto } = state;

    const paleta = {
      titulo,
      preco,
      descricao,
      foto,
    };

    const response = await api.createPaleta(paleta);

    onCreatePaleta(response)

    closeModal()

    return response;
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const response = !Boolean(
      state.titulo.length &&
        state.preco.length &&
        state.descricao.length &&
        state.foto.length
    );

    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionarPaletaModal">
        <form autoComplete="off">
          <h2>Adicionar ao Cardápio</h2>
          <div>
            <label htmlFor="titulo" className="AdicionarPaletaModal__text">
              Título:
            </label>
            <input
              type="text"
              id="titulo"
              placeholder="Paleta de Melancia"
              value={state.titulo}
              onChange={(e) => handleChange(e, "titulo")}
            />
          </div>
          <div>
            <label htmlFor="preco" className="AdicionarPaletaModal__text">
              Preço:
            </label>
            <input
              type="text"
              id="preco"
              placeholder="10,00"
              value={state.preco}
              onChange={(e) => handleChange(e, "preco")}
            />
          </div>
          <div>
            <label htmlFor="descricao" className="AdicionarPaletaModal__text">
              Descrição:
            </label>
            <input
              type="text"
              id="descricao"
              placeholder="Descrição da paleta"
              value={state.descricao}
              onChange={(e) => handleChange(e, "descricao")}
            />
          </div>
          <div>
            <label htmlFor="foto" className="AdicionarPaletaModal__text">
              Foto:
            </label>
            <input
              type="text"
              id="foto"
              placeholder="Link da foto da paleta"
              value={state.foto}
              onChange={(e) => handleChange(e, "foto")}
            />
          </div>

          <button
            className="AdicionarPaletaModal__enviar"
            type="button"
            disabled={canDisable}
            onClick={createPaleta}
          >
            Enviar
          </button>
        </form>
      </div>
    </Modal>
  );
}
