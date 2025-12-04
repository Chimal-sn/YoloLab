import { useState, useRef } from "react";
import InputField from "../campo_formulario/campo_formulario";
import Boton from "../Boton/Boton";
import "../../styles/FormularioAuth.css";

function FormRegistrar({ onSubmit, loading, error }) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const nombreRef = useRef();
    const correoRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const nombreError = nombreRef.current.validate();
        const correoError = correoRef.current.validate();
        const passwordError = passwordRef.current.validate();    
        
        if (nombreError || correoError || passwordError) {
            return;
        }
        if (onSubmit) {
            onSubmit({ nombre, correo, password });
        }
        
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
            <InputField
                ref={nombreRef}
                label="Nombre"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={setNombre}
                required={true}
            />
            <InputField
                ref={correoRef}
                label="Correo"
                type="email"
                placeholder="corre@ejemplo.com"
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
                minLength={8}
            />

            {error && <p className="error">{error}</p>}

            <Boton type="submit" disabled={loading}>
                {loading ? "Cargando..." : "Registrarse"}
            </Boton>
            
            <div className="navegador">
                <p>¿Ya tienes cuenta?</p> <Boton to="/login" tipo = "Auth" >Inicia Sesión</Boton>
            </div>
        </form>
    );
}

export default FormRegistrar;