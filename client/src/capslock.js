export function Capslock(props) {
  return (
    <>
      <div>Texto do props text: {props.text.toUpperCase()}</div>
      <section>
        Texto do children:{" "}
        <h2>{props.textH2 ? props.textH2.toUpperCase() : null}</h2>
      </section>
    </>
  );
}
