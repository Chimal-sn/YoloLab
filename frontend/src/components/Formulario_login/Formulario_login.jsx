import { useState, useRef } from "react";
import InputField from "../campo_formulario/campo_formulario";
import Boton from "../Boton/Boton";
import "../../styles/FormularioAuth.css";

function FormLogin({ onSubmit, loading, error }) {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    // Refs para validar inputs desde aquí
    const correoRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar usando los métodos expuestos por InputField
        const correoError = correoRef.current.validate();
        const passwordError = passwordRef.current.validate();

        // Si hay errores → NO continuar
        if (correoError || passwordError) {
        return;
        }

        // Si todo está correcto se envía
        if (onSubmit) {
        onSubmit({ correo, password });
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
        
            <InputField
                ref={correoRef}
                label="Correo"
                type="email"
                placeholder="correo@ejemplo.com"
                value={correo}
                onChange={setCorreo}
                required={true}
            />

            <InputField
                ref={passwordRef}
                label="Contraseña"
                type="password"
                placeholder="********"
                value={password}
                onChange={setPassword}
                required={true}
            />

            {error && <p className="error">{error}</p>}

            <Boton type="submit" disabled={loading}>
                {loading ? "Cargando..." : "Iniciar sesión"}
            </Boton>

            <div className="navegador">
                <p>¿No tienes cuenta?</p> <Boton to="/registrar" tipo = "Auth" >Regístrate Ahora</Boton>
            </div>

        </form>
    );
}

export default FormLogin;
