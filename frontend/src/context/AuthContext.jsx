// src/context/AuthContext.jsx
import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const auth = useAuth(); // aquí vive 1 sola instancia global
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext debe usarse dentro de <AuthProvider>");
    return ctx;
}
