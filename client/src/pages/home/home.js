import { Card } from "../../components/card/card";
import { Header } from "../../header/header";
import { api } from "../../utils/api/api";
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import Modal from "react-modal";
import "./home.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "40rem",
    height: "50rem",
    transform: "translate(-50%, -50%)",
    backgroundColor: " rgba(0, 0, 0, 0.8)",
    borderRadius: "15px",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.4)",
  },
};

Modal.setAppElement("#root");
export function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uniqueAnime, setUniqueAnime] = useState({});

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
      <Header />
      <div className="card-list">
        {animeList.map((item, index) => {
          return (
            <button
              className="button-card"
              onClick={() => {
                setUniqueAnime(item);
                handleModal();
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
          <section
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "transparent",
                cursor: "pointer",
                border: "none",
              }}
              onClick={handleModal}
            >
              <CgClose size={28} color="red" />
            </button>
          </section>
          <h2>{uniqueAnime.title}</h2>
          <h3>{uniqueAnime.gender}</h3>
          <h3>{uniqueAnime.protagonist}</h3>
          <h3>{uniqueAnime.year}</h3>
        </section>
      </Modal>
    </>
  );
}
