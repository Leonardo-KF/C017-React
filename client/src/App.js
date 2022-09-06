import { Capslock } from "./capslock";
import "./index.css";
export function App() {
  return (
    <>
      <h1 style={{ color: "red", fontSize: "50px" }}>Hello world</h1>
      <Capslock text="um teste" textH2="Um outro texto qualquer" />
      <img
        src="https://avatars.githubusercontent.com/u/89053412?v=4"
        alt="foto bem linda do prof"
      />
    </>
  );
}
