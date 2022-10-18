import "./AdicionarEditarPaletaModal.css";
import { Modal } from "../Modal/Modal";
import { useState, useEffect } from "react";
import { api } from "../../utils/api/api";
import { ActionMode } from "../../constants";

export function AdicionarEditarPaletaModal({
  closeModal,
  onCreatePaleta,
  mode,
  paletaToUpdate,
  onUpdatePaleta,
}) {
  const form = {
    titulo: paletaToUpdate?.titulo ?? "",
    preco: paletaToUpdate?.preco ?? "",
    descricao: paletaToUpdate?.descricao ?? "",
    foto: paletaToUpdate?.foto ?? "",
  };

  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const handleSend = async () => {
    const { titulo, preco, descricao, foto } = state;

    const paleta = {
      titulo,
      preco,
      descricao,
      foto,
    };

    const apiCall = {
      [ActionMode.NORMAL]: () => api.createPaleta(paleta),
      [ActionMode.ATUALIZAR]: () =>
        api.updatePaleta(paletaToUpdate?._id, paleta),
    };

    const response = await apiCall[mode]();

    const actionResponse = {
      [ActionMode.NORMAL]: () => onCreatePaleta(response),
      [ActionMode.ATUALIZAR]: () => onUpdatePaleta(response),
    };

    actionResponse[mode]();

    const reset = {
      titulo: "",
      preco: "",
      descricao: "",
      foto: "",
    };

    setState(reset);

    closeModal();
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const response = !Boolean(
      state.titulo.length &&
        String(state.preco).length &&
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
          <h2>
            {ActionMode.ATUALIZAR === mode ? "Atualizar" : "Adicionar ao"}{" "}
            Cardápio
          </h2>
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
            onClick={handleSend}
          >
            {ActionMode.NORMAL === mode ? "Enviar" : "Atualizar"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
