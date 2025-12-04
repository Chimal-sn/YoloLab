import { useState } from "react";
import InputField from "../campo_formulario/campo_formulario";
import Boton from "../Boton/Boton";
import "../../styles/FormularioAuth.css";

function FormRegistrar({ onSubmit, loading, error }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ nombre, correo, password });
    }
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
            <InputField
                label="Nombre"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={setNombre}
                required={true}
            />
            <InputField
                label="Correo"
                type="email"
                placeholder="corre@ejemplo.com"
                value={correo}
                onChange={setCorreo}
                required={true}
            />
            <InputField
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