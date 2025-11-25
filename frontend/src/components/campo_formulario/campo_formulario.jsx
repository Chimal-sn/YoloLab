import { useState } from "react";
import "./campo_formulario.css";

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  minLength,
  maxLength,
  SoloCaracteres = false,
}) {

  const [error, setError] = useState("");

  const validate = (value) => {
    if (required && value.trim() === "") {
      return "Este campo es obligatorio";
    }

    if (minLength && value.length < minLength) {
      return `Debe tener al menos ${minLength} caracteres`;
    }

    if (maxLength && value.length > maxLength) {
      return `Debe tener máximo ${maxLength} caracteres`;
    }

    if (SoloCaracteres && /[^a-zA-Z]/.test(value)) {
      return "Solo se permiten caracteres alfabéticos";
    }


    return ""; // No hay error
  };

  const handleChange = (newValue) => {
    onChange(newValue);             // actualiza el valor en el padre
    const errorMsg = validate(newValue); // valida
    setError(errorMsg);              // guarda el error
  };

  return (
    <div className="input-field">
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => handleChange(e.target.value)}
      />

      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

export default InputField;
