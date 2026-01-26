import { useState, useRef } from "react";
import InputField from "../campo_formulario/campo_formulario";
import Boton from "../../Botones/Boton/Boton";
import { motion, AnimatePresence } from "framer-motion";


function Form_UsuarioEditar({ onSubmit, loading, error }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [foto, setFoto] = useState("");

    const nombreRef = useRef();
    const apellidoRef = useRef();
    const correoRef = useRef();
    const passwordRef = useRef();
    const fotoRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar usando los métodos expuestos por InputField
        const nombreError = nombreRef.current.validate();
        const apellidoError = apellidoRef.current.validate();
        const correoError = correoRef.current.validate();
        const passwordError = passwordRef.current.validate();
        const fotoError = fotoRef.current.validate();

        // Si hay errores → NO continuar
        if (nombreError || apellidoError || correoError || passwordError || fotoError) {
            return;
        }

        // Si todo está correcto se envía
        if (onSubmit) {
            onSubmit({ nombre, apellido, correo, password, foto });
        }
    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <InputField
                ref={nombreRef}
                label="Nombre"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={setNombre}
                required={true}
            />
            <InputField
                ref={apellidoRef}
                label="Apellido"
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={setApellido}
                required={true}
            />
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
            <InputField
                ref={fotoRef}
                label="Foto"
                type="file"
                placeholder="Foto"
                value={foto}
                onChange={setFoto}
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
                {loading ? "Cargando..." : "Editar Perfil"}
            </Boton>
        </form>
    );
}
