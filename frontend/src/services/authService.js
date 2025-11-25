import axiosClient from "../utils/AxiosCliente";

export async function loginRequest(email, password){
    const response = await axiosClient.post("/api/login/", {
        email,
        password,
    });

    return response.data;
}

export async function registrarRequest(userData) {
    const response = await axiosClient.post("/api/registrar/", userData);
    return response.data;
}

