import FormRegistrar from "../../components/Formulario_registrar/Formulario_registrar";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


function Registrar() {

    const navigate = useNavigate();

    const { registrar, loading, error } = useAuth();
    
    const handleRegister = async ({ nombre, email, password }) => {
        const result = await registrar(nombre, email, password);
        if (result.success) {
            navigate("/");
        }
    }
        
    return (
        <AuthLayout>
            <FormRegistrar
                onSubmit={handleRegister}
                loading={loading}
                error={error}
            />
        </AuthLayout>
    );
}

export default Registrar;