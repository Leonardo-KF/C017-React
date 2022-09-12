import { Card } from "../../components/card/card";
import { api } from "../../utils/api/api";
import { useState, useEffect } from "react";
import "./home.css";
export function Home() {
  const [animeList, setAnimeList] = useState([]);

  async function getAnime() {
    const animes = await api.getAllAnimes();
    setAnimeList(animes);
  }

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
          return <Card key={index} />;
        })}
      </div>
    </>
  );
}
