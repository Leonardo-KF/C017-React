import "./Overlay.css";

export function Overlay({ children, overlayClick }) {
  return (
    <div className="Overlay" onClick={() => overlayClick()}>
      {children}
    </div>
  );
}
