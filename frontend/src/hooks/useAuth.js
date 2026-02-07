import { useEffect, useState, useCallback } from "react";
import { loginRequest, registrarRequest, obtenerUsuarioRequest } from "../services/authService";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    // 1) Función única para cargar usuario desde el token
    const loadUser = useCallback(async () => {
        setLoadingUser(true);

        try {
            const data = await obtenerUsuarioRequest(); // backend lee cookies
            setUser(data);
        } catch (err) {

            // si no hay sesión o expiró
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
    const login = useCallback(async (correo, password) => {
        setLoading(true);
        setError("");

        try {
            const data = await loginRequest(correo, password);

            // el backend setea cookies en headers (Set-Cookie)
            // tú solo recargas el usuario
            await loadUser();

            return { success: true, data };
        } catch (err) {
            setError(err.data?.error || err.message || "Error en el servidor");
            return { success: false };
        } finally {
            setLoading(false);
        }
    }, [loadUser]);


    // 4) Registrar: igual que login
    const registrar = useCallback(async (userData) => {
        setLoading(true);
        setError("");

        try {
            const data = await registrarRequest(userData);
            await loadUser();

            return { success: true, data };
        } catch (err) {
            setError(err.data?.error || err.message || "Error en el servidor");
            return { success: false };
        } finally {
            setLoading(false);
        }
    }, [loadUser]);

    const logout = useCallback(() => {
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
