import { useState, useRef } from "react";
import InputField from "../campo_formulario/campo_formulario";
import Boton from "../../Botones/Boton/Boton";
import "../../../styles/FormularioAuth.css";
import { motion, AnimatePresence } from "framer-motion";

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

            <AnimatePresence mode="wait">
                {error && (
                    <motion.p
                        key="error"
                        className="error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>

            <Boton type="submit" disabled={loading}>
                {loading ? "Cargando..." : "Iniciar sesión"}
            </Boton>

            <div className="navegador">
                <p>¿No tienes cuenta?</p> <Boton to="/registrar" tipo="Auth" >Regístrate Ahora</Boton>
            </div>

        </form>
    );
}

export default FormLogin;
