import Boton from "../../components/Boton/Boton";
import PageTransition from "../../components/Transicion/Transicion";

function Login() {
  return (
    <PageTransition>
      <>
        <div>
          <Boton to ="/" >YoloLab</Boton>
        </div>
        <div>
          <h1>Pantalla de Login</h1>
        </div>
      </>
    </PageTransition>
    
  );
}

export default Login;
