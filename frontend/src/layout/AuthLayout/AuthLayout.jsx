import { useEffect } from "react";
import "./AuthLayout.css";
import fondo from "../../assets/img_formulario.png";
import Boton from "../../components/Boton/Boton";
import PageTransition from "../../components/Transicion/Transicion";

function AuthLayout({ children }) {

    useEffect(() => {
        document.body.classList.add("body-auth");
        return () => {
            document.body.classList.remove("body-auth");
        };
    }, []);

    return (
        <PageTransition>
            <>
                <div className="header">
                    <Boton to="/" tipo="logo">YoloLab</Boton>
                </div>
                <div className ="contenedor_auth">

                    <div className = "contenedor_formulario">
                        <div class = "formulario">
                            {children}
                        </div>
                    </div>
                    <div className = "imagen_auth">
                        <img src = {fondo} alt="Imagen para formulario" />
                    </div>
                </div>
            </>
        </PageTransition>
    );
}

export default AuthLayout;