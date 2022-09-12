import { Capslock } from "./capslock";
import { Home } from "./home";
import { Form } from "./components/form/form";
import "./index.css";
import { Card } from "./components/card/card";
export function App() {
  return (
    <>
      <div className="card-list">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <Home />
      <Form />
      <h1 style={{ color: "red", fontSize: "50px" }}>Hello world</h1>
      <Capslock text="um teste" textH2="Um outro texto qualquer" />
      <img
        src="https://avatars.githubusercontent.com/u/89053412?v=4"
        alt="foto bem linda do prof"
      />
    </>
  );
}
