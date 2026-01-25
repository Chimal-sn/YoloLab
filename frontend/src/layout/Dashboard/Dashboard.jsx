import { useEffect } from "react";
import "./Dashboard.css";
import BotonMenu from "../../components/BotonMenu/BotonMenu";
import Boton from "../../components/Boton/Boton";
import { useAuthContext } from "../../context/AuthContext";
import foto_perfil from "../../assets/perfil_default.png";

function Dashboard({ children }) {
    const { user, loadingUser } = useAuthContext();

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="logo_dashboard">
                    <Boton to="/" tipo="logo_dashboard">
                        YoloLab
                    </Boton>
                </div>

                <div className="info_perfil">
                    <img src={user?.foto || foto_perfil} alt="foto_perfil" />
                    <p>{user?.nombre}</p>
                </div>

                <div className="opciones">
                    <BotonMenu
                        label="Modelos"
                        tipo="boton_dashboard"
                        iconLeft="modelo" r
                        iconSize={30}
                        opciones={[
                            { label: "Dashboard", to: "/dashboard" },
                            { label: "Users", to: "/users" },
                            { label: "Products", to: "/products" },
                        ]}
                    />

                    <BotonMenu
                        label="Datasets"
                        tipo="boton_dashboard"
                        iconLeft="dataset"
                        iconSize={30}
                        opciones={[
                            { label: "Dashboard", to: "/dashboard" },
                            { label: "Users", to: "/users" },
                            { label: "Products", to: "/products" },
                        ]}
                    />
                </div>
            </aside>

            <main className="main">
                <div className="panel">{children}</div>
            </main>
        </div>
    );
}

export default Dashboard;
