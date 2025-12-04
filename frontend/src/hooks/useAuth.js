import { useState } from "react";
import { loginRequest } from "../services/authService";
import { registrarRequest } from "../services/authService";

export function useAuth(){
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState("");

    //Funcion que recibe email y password

    const login = async (correo, password) => {
        setLoading (true);
        setError("");

        try{
            const data = await loginRequest (correo, password);

            if (data.token){
                localStorage.setItem("token", data.token);

            }

            return { success: true, data};
        }catch (err){
            setError(err.data?.error ||"Error en el servidor");
            return { success: false};
        } finally {
            setLoading (false);
        }
    };

    const registrar = async (userData) => {
        setLoading (true);
        setError("");

        try{
            const data = await registrarRequest (userData);
            if (data.token){
                localStorage.setItem("token", data.token);
            }

            return { success: true, data};
        }catch (err){
            setError(err.data?.error ||"Error en el servidor");
            return { success: false};
        } finally {
            setLoading (false);
        }
    };

    return {
        login,
        registrar,
        loading,
        error,
    };
}