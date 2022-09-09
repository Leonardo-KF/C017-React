import { useState } from "react";
export function Home() {
  const [numero, setNumero] = useState(0);

  function AddNumber() {
    setNumero(numero + 1);
  }

  console.log(numero);

  return (
    <div>
      <h3>Contador</h3>
      <span>{numero}</span>
      <button onClick={AddNumber}>Adicionar numero</button>
    </div>
  );
}
