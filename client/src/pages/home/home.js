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
  const [editAnime, setEditAnime] = useState(false);

  async function getAnime() {
    const animes = await api.getAllAnimes();
    setAnimeList(animes);
  }

  function deleteAnime(animeId) {
    api.deleteAnime(animeId);
    const newAnimeList = animeList;
    newAnimeList.map((anime, index) => {
      if (anime.id === animeId) {
        newAnimeList.splice(index, 1);
        setAnimeList(newAnimeList);
        handleModal();
      }
    });
  }

  function handleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function changeAnime(event, animeId) {
    event.preventDefault();

    const anime = {
      title: event.target.title.value,
      protagonist: event.target.protagonist.value,
      gender: event.target.gender.value,
      year: event.target.year.value,
      characters: [],
    };

    const newAnimeList = animeList;
    newAnimeList.map((item, index) => {
      if (item.id === animeId) {
        newAnimeList.splice(index, 1, anime);
        setAnimeList(newAnimeList);
        handleModal();
      }
    });
    setEditAnime(false);
  }

  // executa novamente toda vez que um state for alterado
  // useEffect(() => {
  //   getAnime();
  // });

  // executa somente quando o componente for renderizado pois não há nada no array de dependencias
  useEffect(() => {
    getAnime();
  }, []);

  // executa somente quando a(s) dependencia(s) do array tiverem alguma mutação
  //   useEffect(() => {
  //     getAnime();
  //   }, [animeList]);

  return (
    <section className="home-page">
      <Header getAll={getAnime} />
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
        {editAnime ? (
          <>
            (
            <div className="form">
              <form onSubmit={changeAnime} className="form-inputs">
                <section>
                  <span>Title:</span>
                  <input
                    type="text"
                    name="title"
                    defaultValue={uniqueAnime.title}
                  ></input>
                </section>
                <section>
                  <span>Protagonist</span>
                  <input
                    type="text"
                    name="protagonist"
                    defaultValue={uniqueAnime.protagonist}
                  ></input>
                </section>
                <section>
                  <span>Gender:</span>
                  <input
                    type="text"
                    name="gender"
                    defaultValue={uniqueAnime.gender}
                  ></input>
                </section>
                <section>
                  <span>Year:</span>
                  <input
                    type="number"
                    name="year"
                    defaultValue={uniqueAnime.year}
                  ></input>
                </section>
                <button type="submit" className="btn-submit">
                  Submit
                </button>
              </form>
            </div>
            )
          </>
        ) : (
          <>
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
            <button
              onClick={() => {
                setEditAnime(true);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteAnime(uniqueAnime.id);
              }}
            >
              Delete
            </button>
          </>
        )}
      </Modal>
    </section>
  );
}
