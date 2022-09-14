import { Card } from "../../components/card/card";
import { api } from "../../utils/api/api";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./home.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.4)",
  },
};

Modal.setAppElement("#root");
export function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function getAnime() {
    const animes = await api.getAllAnimes();
    setAnimeList(animes);
  }

  function handleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  console.log(animeList);

  // executa novamente toda vez que um state for alterado
  //   useEffect(() => {
  //     getAnime();
  //   });

  // executa somente quando o componente for renderizado pois não há nada no array de dependencias
  useEffect(() => {
    getAnime();
  }, []);

  // executa somente quando a(s) dependencia(s) do array tiverem alguma mutação
  //   useEffect(() => {
  //     getAnime();
  //   }, [animeList]);

  console.log("Renderizou");
  return (
    <>
      <div className="card-list">
        {animeList.map((item, index) => {
          return (
            <button
              className="button-card"
              onClick={() => {
                handleModal();
                console.log(item);
              }}
              key={index}
            >
              <Card
                title={item.title}
                gender={item.gender}
                protagonist={item.protagonist}
                year={item.year}
              />
            </button>
          );
        })}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModal}
        style={customStyles}
        contentLabel="Card details"
      >
        <section>
          <h2>{}</h2>
        </section>
      </Modal>
    </>
  );
}
