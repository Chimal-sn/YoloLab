import { useState, useRef } from "react";
import InputField from "../campo_formulario/campo_formulario";
import Boton from "../../Botones/Boton/Boton";
import { motion, AnimatePresence } from "framer-motion";
import FotoEditable from "../CampoFotoEditable/Campo_foto";
import foto_default from "../../../assets/perfil_default.png"

function FormUsuarioEditar({ onSubmit, loading, error, usuario }) {
    const [nombre, setNombre] = useState(usuario?.nombre || "");
    const [correo, setCorreo] = useState(usuario?.correo || "");

    const [fotoPreview, setFotoPreview] = useState(usuario?.foto || "");
    const [fotoFile, setFotoFile] = useState(null);

    const nombreRef = useRef();
    const correoRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const nombreError = nombreRef.current?.validate?.();
        const correoError = correoRef.current?.validate?.();

        if (nombreError || correoError) return;

        if (onSubmit) {
            onSubmit({ nombre, correo, foto: fotoFile });
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>

            <FotoEditable
                fotoPreview={fotoPreview || foto_default}
                onFileSelected={(file) => {
                    setFotoFile(file);
                    setFotoPreview(URL.createObjectURL(file));
                }}
            />


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
                ref={correoRef}
                label="Correo"
                type="email"
                placeholder="correo@ejemplo.com"
                value={correo}
                onChange={setCorreo}
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

export default FormUsuarioEditar;
