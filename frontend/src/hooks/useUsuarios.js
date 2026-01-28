import { useEffect, useState, useCallback } from "react";
import { editarPerfilRequest } from "../services/usuarioService";

export function useUsuarios() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [usuario, setUsuario] = useState(null);

    const EditarUsuario = useCallback(async (nombre, correo, foto) => {
        setLoading(true);
        setError(null);
        try {
            const response = await editarPerfilRequest({ nombre, correo, foto });
            setUsuario(response);
            return { success: true };
        } catch (error) {
            const msg =
                error?.response?.data?.error ||
                error?.response?.data?.detail ||
                error?.message ||
                "Error en el servidor";
            setError(msg);
            return { success: false, error: msg };
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