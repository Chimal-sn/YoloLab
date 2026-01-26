import axiosClient from "../utils/AxiosCliente";

export async function editarPerfilRequest(nombre, apellido, correo, password, foto) {
    const response = await axiosClient.put("/usuarios/API/EditarPerfil/", {
        nombre,
        apellido,
        correo,
        password,
        foto,
    });
    return response.data;
}
