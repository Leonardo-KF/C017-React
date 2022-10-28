import "./Loading.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("sacola", "[]");
    localStorage.setItem("selecionadas", "[]");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });
  
  return (
    <div className="Loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
