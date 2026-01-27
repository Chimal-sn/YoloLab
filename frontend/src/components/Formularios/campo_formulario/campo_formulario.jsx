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
        // 🔹 Caso especial: file
        if (type === "file") {
            if (required && !valueToCheck) {
                return "Debe seleccionar un archivo";
            }
            return "";
        }

        // 🔹 Validaciones normales (string)
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

        return "";
    };

    // 🔹 Exponemos validate() al padre
    useImperativeHandle(ref, () => ({
        validate: () => {
            const err = validate();
            setError(err);
            return err;
        }
    }));

    const handleChange = (e) => {
        if (type === "file") {
            const file = e.target.files?.[0] || null;
            onChange(file);
            const err = validate(file);
            setError(err);
        } else {
            const newValue = e.target.value;
            onChange(newValue);
            const err = validate(newValue);
            setError(err);
        }
    };

    return (
        <div className="input-field">
            <label>{label}</label>

            <input
                type={type}
                placeholder={placeholder}
                {...(type !== "file" && { value })}
                onChange={handleChange}
            />

            {error && <span className="error-text">{error}</span>}
        </div>
    );
});

export default InputField;
