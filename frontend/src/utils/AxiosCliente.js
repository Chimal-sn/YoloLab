import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let pendingRequests = [];

function onRefreshed() {
    pendingRequests.forEach((cb) => cb());
    pendingRequests = [];
}

function addPendingRequest(cb) {
    pendingRequests.push(cb);
}

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.response) {
            return Promise.reject({
                status: 500,
                data: { error: "Error de conexión con el servidor" },
            });
        }

        const status = error.response.status;
        const config = error.config; // ✅ aquí está la request original

        // Evitar loop: si el 401 viene del refresh, ya no reintentes refresh
        if (config?.url?.includes("/usuarios/refresh/")) {
            return Promise.reject(error.response);
        }

        if (status === 401 && config && !config._retry) {
            config._retry = true;

            if (isRefreshing) {
                return new Promise((resolve) => {
                    addPendingRequest(() => resolve(axiosClient(config)));
                });
            }

            isRefreshing = true;

            try {
                await axiosClient.post("/usuarios/refresh/"); // ✅ ruta correcta

                isRefreshing = false;
                onRefreshed();

                return axiosClient(config); // reintenta original
            } catch (refreshErr) {
                isRefreshing = false;
                pendingRequests = [];
                return Promise.reject(refreshErr.response || refreshErr);
            }
        }

        return Promise.reject(error.response);
    }
);

export default axiosClient;
