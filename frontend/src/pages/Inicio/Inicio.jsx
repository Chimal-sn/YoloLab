import { useEffect } from "react";
import "./Inicio.css";
import fondo from "../../assets/img_inicio.png";
import Boton from "../../components/Boton/Boton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Inicio() {
  useEffect(() => {
    document.body.classList.add("body-inicio");

    return () => {
      document.body.classList.remove("body-inicio");
    };
  }, []);

  return (
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
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </>
  );
}

export default Inicio;
