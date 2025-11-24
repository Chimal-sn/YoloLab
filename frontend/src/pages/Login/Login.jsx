import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import fondo from "../../assets/img_formulario.png"
import Boton from "../../components/Boton/Boton";
import PageTransition from "../../components/Transicion/Transicion";
import FormLogin from "../../components/Formulario_login/Formulario_login";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();

  const { login, loading, error } = useAuth();

  useEffect(() => {
    document.body.classList.add("body-login"); 
    return () => {
      document.body.classList.remove("body-login");
    };
  }, []);

  const handleLogin = async ({ email, password }) => {
    const result = await login(email, password);
    if (result.success) {
      navigate("/"); 
    }
  }

  return (
  
    <PageTransition>
      <>
        <div className="header">
          <Boton to="/" tipo="logo">YoloLab</Boton>
        </div>

        <div className ="contenedor_login">

          <div className = "contenedor_formulario">

            <div class = "formulario">
              <FormLogin 
                onSubmit={handleLogin}
                loading={loading}
                error={error}
              />
              <p>¿No tienes cuenta? Registrate ahora</p>
            </div>

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
