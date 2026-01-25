import { useNavigate } from "react-router-dom";
import FormLogin from "../../components/Formularios/Formulario_login/Formulario_login";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import { useAuthContext } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login, loading, error } = useAuthContext();

    const handleLogin = async ({ correo, password }) => {
        const result = await login(correo, password);

        if (result.success) {
            navigate("/Perfil");
        }
    };

    return (
        <AuthLayout>
            <FormLogin
                onSubmit={handleLogin}
                loading={loading}
                error={error}
            />
        </AuthLayout>
    );
}

export default Login;
