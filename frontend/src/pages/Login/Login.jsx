import { useEffect } from "react";
import "./Login.css";
import fondo from "../../assets/img_formulario.png"
import Boton from "../../components/Boton/Boton";
import PageTransition from "../../components/Transicion/Transicion";
import { motion } from "framer-motion";

function Login() {
  useEffect(() => {
    document.body.classList.add("body-login"); 
    return () => {
      document.body.classList.remove("body-login");
    };
  }, []);

  return (
    <PageTransition>
      <>
        <div className="header">
          <Boton to="/" tipo="logo">YoloLab</Boton>
        </div>
        <div className ="contenedor_login">
          <div className = "formulario_login">
            <h1>Pantalla de Login</h1>
          </div>
          <div className = "imagen_login">
            <img src = {fondo} alt="Imagen para formulario" />
          </div>
        </div>

        
      </>
    </PageTransition>
  );
}

export default Login;
