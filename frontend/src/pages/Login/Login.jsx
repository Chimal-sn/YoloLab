import { useNavigate } from "react-router-dom";
import FormLogin from "../../components/Formulario_login/Formulario_login";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();

  const { login, loading, error } = useAuth();
  
  const handleLogin = async ({ email, password }) => {
    const result = await login(email, password);
    if (result.success) {
      navigate("/"); 
    }
  }

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
