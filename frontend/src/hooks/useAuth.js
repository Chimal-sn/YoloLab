import { useState } from "react";
import { loginRequest } from "../services/authService";


export function useAuth(){
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState("");

    //Funcion que recibe email y password

    const login = async (email, password) => {
        setLoading (true);
        setError("");

        try{
            const data = await loginRequest (email, password);

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
        loading,
        error,
    };
}