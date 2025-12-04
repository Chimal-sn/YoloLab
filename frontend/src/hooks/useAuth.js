import { useEffect, useState, useCallback } from "react";
import { loginRequest } from "../services/authService";
import { registrarRequest } from "../services/authService";
import { obtenerUsuarioRequest } from "../services/authService";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchUser = async () => {
            try {
                const data = await obtenerUsuarioRequest();
                setUser(data);
            } catch (err) {
                console.log("Token inválido o expirado");
                localStorage.removeItem("token");
                setUser(null);
            }
        };

        fetchUser();
    }, []);


    const login = useCallback(async (correo, password) => {
        setLoading(true);
        setError("");


        try {
            const data = await loginRequest(correo, password);

            if (data.access) {
                localStorage.setItem("token", data.access);
                console.log("Token guardado" + data.access);
            }

            if (data.usuario) {
                setUser(data.usuario);
            }

            return { success: true, data };
        } catch (err) {
            setError(err.data?.error || "Error en el servidor");
            return { success: false };
        } finally {
            setLoading(false);
        }
    }, []);

    const registrar = useCallback(async (userData) => {
        setLoading(true);
        setError("");

        try {
            const data = await registrarRequest(userData);
            if (data.access) {
                localStorage.setItem("token", data.access);
            }

            if (data.usuario) {
                setUser(data.usuario);
            }

            return { success: true, data };
        } catch (err) {
            setError(err.data?.error || "Error en el servidor");
            return { success: false };
        } finally {
            setLoading(false);
        }
    }, []);


    //Funcion que cierra sesión
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
    }, []);

    return {
        user,
        login,
        registrar,
        logout,
        loading,
        error,
    };
}