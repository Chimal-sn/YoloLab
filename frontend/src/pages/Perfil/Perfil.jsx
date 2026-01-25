import Dashboard from "../../layout/Dashboard/Dashboard";
import { useAuthContext } from "../../context/AuthContext";
import foto_perfil from "../../assets/perfil_default.png";
import "./Perfil.css";

function Perfil() {
    const { user } = useAuthContext();
    return (
        <Dashboard>
            <div className="Perfil">
                <div className="detalle_perfil">
                    <div className="img_perfil">
                        <img src={user?.foto || foto_perfil} alt="foto_perfil" />

                    </div>
                    <div className="detalle">
                        <p>{user?.nombre}</p>
                        <p>{user?.correo}</p>
                    </div>
                    <div className="botones">

                    </div>

                </div>
                <div className="Acciones_rapidas">
                    <p>Acciones rápidas</p>
                </div>
                <div className="Actividad_reciente">
                    <p>Actividad reciente</p>

                </div>
            </div>
        </Dashboard>
    );
}

export default Perfil;
