import { useState } from "react";
import InputField from "../campo_formulario/campo_formulario";
import Boton from "../Boton/Boton";
import "./Formulario_login.css";

function FormLogin({ onSubmit, loading, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ email, password });
    }
  };

  return (
    <form className="form-login" onSubmit={handleSubmit}>
      <InputField
        label="Correo"
        type="email"
        placeholder="correo@ejemplo.com"
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
      />

      {error && <p className="error-login">{error}</p>}

      <Boton type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Iniciar sesión"}
      </Boton>
    </form>
  );
}

export default FormLogin;
