import { useEffect, useState, useCallback } from "react";
import { editarPerfilRequest } from "../services/usuarioService";

export function useUsuarios() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [usuario, setUsuario] = useState(null);

    const EditarUsuario = useCallback(async (nombre, correo, foto) => {
        setLoading(true);
        try {
            const response = await editarPerfilRequest({ nombre, correo, foto });
            setUsuario(response);

        } catch (error) {
            const msg =
                err?.response?.data?.error ||
                err?.response?.data?.detail ||
                err?.message ||
                "Error en el servidor";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        usuario,
        EditarUsuario
    };


}