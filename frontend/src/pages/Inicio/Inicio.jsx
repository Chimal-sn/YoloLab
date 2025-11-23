import { useEffect } from "react";
import "./Inicio.css";
import fondo from "../../assets/img_inicio.png";
import Boton from "../../components/Boton/Boton";
import PageTransition from "../../components/Transicion/Transicion";
import { motion } from "framer-motion";

function Inicio() {
  useEffect(() => {
    document.body.classList.add("body-inicio");

    return () => {
      document.body.classList.remove("body-inicio");
    };
  }, []);

  return (
    <PageTransition>
      <>
        <div className="header">
          <h2>YoloLab</h2>

          <div className="sesion">
            <Boton to="/login" tipo = "sin_fondo">Iniciar Sesión</Boton>
            <Boton>Registrarse</Boton>
          </div>
        </div>

        <div className="contenedor-inicio">
          <motion.h1
            className="titulo"
          >
            Explora,<br />
            entrena,<br />
            experimenta
          </motion.h1>

          <motion.img
            src={fondo}
            alt="Fondo inicio"
            className="imagen-inicio"
          />
        </div>
      </>
    </PageTransition>
  );
}

export default Inicio;
