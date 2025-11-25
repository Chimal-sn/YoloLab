import { useState } from "react";
import InputField from "../campo_formulario/campo_formulario";
import Boton from "../Boton/Boton";
import "./Formulario_registrar.css";

function FormRegistrar({ onSubmit, loading, error }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ nombre, email, password });
    }
    };
    return (
    <form className="form-registrar" onSubmit={handleSubmit}>
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
            value={email}
            onChange={setEmail}
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

        {error && <p className="error-registrar">{error}</p>}
        <Boton type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Registrarse"}
        </Boton>
    </form>
    );
}

export default FormRegistrar;