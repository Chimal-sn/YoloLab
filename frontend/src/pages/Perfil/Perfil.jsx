import Dashboard from "../../layout/Dashboard/Dashboard";
import { useAuthContext } from "../../context/AuthContext";
import foto_perfil from "../../assets/perfil_default.png";
import "./Perfil.css";
import Boton from "../../components/Botones/Boton/Boton";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";

function Perfil() {
    const { user } = useAuthContext();
    const [editar, setEditar] = useState(false);

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
                        <Boton tipo="primario" onClick={() => setEditar(true)}>Editar Perfil</Boton>
                    </div>

                </div>
                <div className="Acciones_rapidas">
                    <p>Acciones rápidas</p>
                </div>
                <div className="Actividad_reciente">
                    <p>Actividad reciente</p>

                </div>
            </div>

            <Modal isOpen={editar} onClose={() => setEditar(false)}>
                <h2>Editar Perfil</h2>

                <form>
                    <input
                        type="text"
                        placeholder="Nombre"
                        defaultValue={user?.nombre || ""}
                    />
                    <input
                        type="email"
                        placeholder="Correo"
                        defaultValue={user?.correo || ""}
                    />

                    <Boton tipo="primario">Guardar Cambios</Boton>
                </form>
            </Modal>

        </Dashboard>
    );
}

export default Perfil;
