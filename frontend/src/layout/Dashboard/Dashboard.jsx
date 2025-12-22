import { useEffect } from "react";
import "./Dashboard.css";
import BotonMenu from "../../components/BotonMenu/BotonMenu";

function Dashboard({ children }) {
    return (
        <div className="dashboard">
            <BotonMenu
                label="Menu"
                tipo="primario"
                iconRight="menu"
                opciones={[
                    { label: "Dashboard", to: "/dashboard" },
                    { label: "Users", to: "/users" },
                    { label: "Products", to: "/products" },
                ]}
            />
            <div className="contenedor_dashboard">
                {children}
            </div>
        </div>
    );
}

export default Dashboard;
