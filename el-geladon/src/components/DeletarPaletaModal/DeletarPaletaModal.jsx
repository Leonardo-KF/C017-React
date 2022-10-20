import "./DeletarPaletaModal.css";
import { Modal } from "../Modal/Modal";
import { api } from "../../utils/api/api";

export function DeletarPaletaModal({
  closeModal,
  paletaParaDeletar,
  onDeletePaleta,
}) {
  const handleDelete = async (paleta) => {
    await api.deletePaleta(paleta._id);
    onDeletePaleta(paleta);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="DeletarPaletaModal">
        <h2>Confirmação</h2>
        <p>
          Você realmente deseja remover <b>{paletaParaDeletar.titulo}</b> do
          cardápio?
        </p>
        <img
          className="DeletarPaletaModal__foto"
          src={paletaParaDeletar.foto}
          alt={paletaParaDeletar.titulo}
        />
        <br />
        <div>
          <button
            className="DeletarPaletaModal__confirmar"
            onClick={() => handleDelete(paletaParaDeletar)}
          >
            Confirmar
          </button>
          <button className="DeletarPaletaModal__cancelar" onClick={closeModal}>
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}
