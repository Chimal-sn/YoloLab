import axiosClient from "../utils/AxiosCliente";

export async function loginRequest(correo, password) {
    const response = await axiosClient.post("/usuarios/API/IniciarSesion/", {
        correo,
        password,
    });
    return response.data;
}

export async function registrarRequest(userData) {
    const response = await axiosClient.post("/usuarios/API/Registrar/", userData);
    return response.data;
}

export async function obtenerUsuarioRequest() {
    const response = await axiosClient.get("/usuarios/API/ObtenerUsuario/");
    return response.data;
}


