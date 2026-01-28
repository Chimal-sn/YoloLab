import axiosClient from "../utils/AxiosCliente";

export async function editarPerfilRequest(userData) {

    const formData = new FormData();
    formData.append("nombre", userData.nombre);
    formData.append("correo", userData.correo);

    if (userData.foto) {
        formData.append("foto", userData.foto);
    }

    const response = await axiosClient.put("usuarios/me/", formData);

    return response.data;
}
