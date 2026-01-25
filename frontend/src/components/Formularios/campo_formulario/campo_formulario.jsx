import { useState, forwardRef, useImperativeHandle } from "react";
import "./campo_formulario.css";

const InputField = forwardRef(({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  minLength,
  maxLength,
  SoloCaracteres = false,
}, ref) => {

  const [error, setError] = useState("");

  const validate = (valueToCheck = value) => {
    if (required && valueToCheck.trim() === "") {
      return "Este campo es obligatorio";
    }

    if (minLength && valueToCheck.length < minLength) {
      return `Debe tener al menos ${minLength} caracteres`;
    }

    if (maxLength && valueToCheck.length > maxLength) {
      return `Debe tener máximo ${maxLength} caracteres`;
    }

    if (SoloCaracteres && /[^a-zA-Z]/.test(valueToCheck)) {
      return "Solo se permiten caracteres alfabéticos";
    }

    return ""; // Sin errores
  };

  // Exponemos validate() para el formulario padre
  useImperativeHandle(ref, () => ({
    validate: () => {
      const err = validate();
      setError(err);
      return err;
    }
  }));

  const handleChange = (newValue) => {
    onChange(newValue);
    const errorMsg = validate(newValue);
    setError(errorMsg);
  };

  return (
    <div className="input-field">
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />

      {error && <span className="error-text">{error}</span>}
    </div>
  );
});

export default InputField;
