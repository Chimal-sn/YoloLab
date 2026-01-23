import { useEffect } from "react";
import "./Dashboard.css";
import BotonMenu from "../../components/BotonMenu/BotonMenu";
import Boton from "../../components/Boton/Boton";
import { useAuthContext } from "../../context/AuthContext";
import foto_perfil from "../../assets/perfil_default.png";


function Dashboard({ children }) {
    const { user, loadingUser } = useAuthContext();

    if (loadingUser) {
        return (
            <div className="dashboard">
                <main className="main">
                    <div className="panel">Cargando usuario...</div>
                </main>
            </div>
        );
    }

    // Si ya terminó de cargar y no hay user, probablemente no hay sesión válida
    if (!user) {
        return (
            <div className="dashboard">
                <main className="main">
                    <div className="panel">No hay sesión activa.</div>
                </main>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="logo"><Boton to="/" tipo="logo">YoloLab</Boton></div>

                <div className="info_perfil">
                    <img src={user.foto || foto_perfil} alt="" />
                    <p>{user.nombre}</p>
                </div>

                {/* ... */}
            </aside>

            <main className="main">
                <div className="panel">{children}</div>
            </main>
        </div>
    );
}


export default Dashboard;
