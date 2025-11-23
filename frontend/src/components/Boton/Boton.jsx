import { Link } from "react-router-dom";
import { motion } from "framer-motion";  
import "./Boton.css";

function Boton({ children, to, tipo = "primario", ...props }) {
  const clases = `boton ${tipo}`;

  if (to) {
    return (
      <Link to={to}>
        <motion.button
          className={clases}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...props}
        >
          {children}
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button
      className={clases}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}


export default Boton;
