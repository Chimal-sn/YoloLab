import "./Inicio.css";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <>
      <div className="header">
        <h2>YoloLab</h2>
        <Link to="/login">
          <button>Ir al Login</button>
        </Link>
      </div>

      <div className="contenedor-inicio">
        <h1 className="titulo">Explora, entrena, experimenta</h1>

      </div>
    </>
  );
}

export default Inicio;
