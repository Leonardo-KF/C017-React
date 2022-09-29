import "./PaletaDetalhesModal.css";
import { Modal } from "../Modal/Modal";

export function PaletaDetalhesModal({ paleta, closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <div className="PaletaDetalhesModal">
        <div>
          <div className="PaletaDetalhesModal__titulo">{paleta.titulo}</div>
          <div className="PaletaDetalhesModal__preco">
            R$ {Number(paleta.preco).toFixed(2)}
          </div>
          <div className="PaletaDetalhesModal__descricao">
            {paleta.descricao}
          </div>
        </div>
        <img
            src={paleta.foto}
            alt={`Paleta de ${paleta.sabor}`}
            className="PaletaDetalhesModal__foto"
          />
      </div>
    </Modal>
  );
}
