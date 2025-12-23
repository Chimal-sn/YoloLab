import { useEffect } from "react";
import "./Dashboard.css";
import BotonMenu from "../../components/BotonMenu/BotonMenu";
import Boton from "../../components/Boton/Boton";
import { useAuthContext } from "../../context/AuthContext";
import foto_perfil from "../../assets/perfil_default.png";
import Icon from "../../components/Icon/Icon";

function Dashboard({ children }) {
    const { user, loadingUser } = useAuthContext();

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="logo"><Boton to="/" tipo="logo">YoloLab</Boton></div>
                <div className="info_perfil">
                    <img
                        src={user?.foto || foto_perfil}
                        alt="" />
                    <p>{user?.nombre}</p>
                </div>

                <BotonMenu
                    label="Menu"
                    tipo="boton_dashboard"
                    iconRight="modelo"
                    opciones={[
                        { label: "Dashboard", to: "/dashboard" },
                        { label: "Users", to: "/users" },
                        { label: "Products", to: "/products" },
                    ]}
                />
            </aside>

            <main className="main">
                <div className="panel">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
