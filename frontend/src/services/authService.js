import axiosClient from "../utils/AxiosCliente";

export async function loginRequest(email, password){
    const response = await axiosClient.post("/api/login/", {
        email,
        password,
    });

    return response.datas;
}