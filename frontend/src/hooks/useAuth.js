import { useEffect, useState, useCallback } from "react";
import { loginRequest, registrarRequest, obtenerUsuarioRequest } from "../services/authService";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    // 1) Función única para cargar usuario desde el token
    const loadUser = useCallback(async () => {
        const token = localStorage.getItem("token");

        // Si no hay token, no hay sesión
        if (!token) {
            setUser(null);
            setLoadingUser(false);
            return;
        }

        setLoadingUser(true);

        try {
            const data = await obtenerUsuarioRequest();
            setUser(data);
        } catch (err) {
            // Token inválido/expirado
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoadingUser(false);
        }
    }, []);

    // 2) Rehidrata sesión al arrancar la app (una sola vez, bien hecho)
    useEffect(() => {
        loadUser();
    }, [loadUser]);

    // 3) Login: guarda token y luego carga usuario con ese token
    const login = useCallback(
        async (correo, password) => {
            setLoading(true);
            setError("");

            try {
                const data = await loginRequest(correo, password);

                if (data.access) {
                    localStorage.setItem("token", data.access);
                    await loadUser(); // <-- CLAVE
                } else {
                    throw new Error("No llegó token (access)");
                }

                return { success: true, data };
            } catch (err) {
                setError(err.data?.error || err.message || "Error en el servidor");
                return { success: false };
            } finally {
                setLoading(false);
            }
        },
        [loadUser]
    );

    // 4) Registrar: igual que login
    const registrar = useCallback(
        async (userData) => {
            setLoading(true);
            setError("");

            try {
                const data = await registrarRequest(userData);

                if (data.access) {
                    localStorage.setItem("token", data.access);
                    await loadUser(); // <-- CLAVE
                } else {
                    throw new Error("No llegó token (access)");
                }

                return { success: true, data };
            } catch (err) {
                setError(err.data?.error || err.message || "Error en el servidor");
                return { success: false };
            } finally {
                setLoading(false);
            }
        },
        [loadUser]
    );

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
        setLoadingUser(false);
    }, []);

    return {
        user,
        loadingUser,
        loadUser, // opcional, por si luego quieres llamarlo desde componentes
        login,
        registrar,
        logout,
        loading,
        error,
    };
}
