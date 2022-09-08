export function Home() {
  let numero = 0;

  function AddNumber() {
    numero = numero + 1;
    console.log(numero);
  }

  return (
    <div>
      <h3>Contador</h3>
      <span>{numero}</span>
      <button onClick={AddNumber}>Adicionar numero</button>
    </div>
  );
}
