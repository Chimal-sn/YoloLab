import axiosClient from "../utils/AxiosCliente";

export async function editarPerfilRequest(userData) {
    const response = await axiosClient.put("usuarios/me/", userData);
    return response.data;
}
