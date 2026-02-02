import Dashboard from "../../layout/Dashboard/Dashboard";
import { useAuthContext } from "../../context/AuthContext";
import foto_perfil from "../../assets/perfil_default.png";
import "./Perfil.css";
import Boton from "../../components/Botones/Boton/Boton";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import FormUsuarioEditar from "../../components/Formularios/Formulario_UsuarioEditar/Formulario_UsuarioEditar";
import { useUsuarios } from "../../hooks/useUsuarios";
import { getFotoUrl } from "../../utils/GetFotoUrl";

function Perfil() {
    const { user } = useAuthContext();
    const [editar, setEditar] = useState(false);
    const [confirmacion, setConfirmacion] = useState(false);

    const { EditarUsuario, loading, error } = useUsuarios();

    const handleSubmit = async ({ nombre, correo, foto }) => {
        const result = await EditarUsuario(nombre, correo, foto);
        if (result.success) {
            setConfirmacion(true);
            setEditar(false);
        }

    };


    return (
        <Dashboard>
            <div className="Perfil">
                <div className="detalle_perfil">
                    <div className="img_perfil">
                        <img src={getFotoUrl(user?.foto) || foto_perfil} alt="foto_perfil" />
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

            <Modal
                isOpen={editar}
                onClose={() => setEditar(false)}
                title="Editar Perfil"
            >

                <FormUsuarioEditar
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    usuario={user}
                />

            </Modal>

            <Modal
                isOpen={confirmacion}
                onClose={() => setConfirmacion(false)}
                title="Confirmación"
                type="confirmacion"
            >
                <p>Perfil editado correctamente</p>
                <Boton tipo="boton_confirmacion" onClick={() => setConfirmacion(false)}>Aceptar</Boton>
            </Modal>

        </Dashboard>
    );
}

export default Perfil;
