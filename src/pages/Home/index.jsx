import "./style.css";
import {Card} from '../../components/Card'

export function Home() {
  return (
    <div className="container">
      <h1>Lista de Presença</h1>
      <input type="text" placeholder="Digite o nome..." />
      <button type="button">Adicionar</button>

      <Card name="Marcus Silva" time="21:44:52"/>
      <Card name="Leo Fleck" time="21:56:34"/>
      <Card name="Shaolin" time="22:03:12"/>
    </div>
  );
}
