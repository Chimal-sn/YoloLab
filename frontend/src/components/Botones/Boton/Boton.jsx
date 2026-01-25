import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Boton.css";
import Icon from "../../Icon/Icon";

function Boton({
  children,
  to,
  tipo = "primario",
  iconLeft,
  iconRight,
  iconSize = 24,
  anim = true,
  ...props
}) {
  const clases = `boton ${tipo}`;

  const motionProps = anim
    ? {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
    }
    : {};

  const contenido = (
    <>
      {iconLeft && <span className="boton-icon left"><Icon name={iconLeft} size={iconSize} /></span>}
      <span className="boton-text">{children}</span>
      {iconRight && <span className="boton-icon right"><Icon name={iconRight} size={iconSize} /></span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="boton-link">
        <motion.button className={clases} {...motionProps} {...props}>
          {contenido}
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button className={clases} {...motionProps} {...props}>
      {contenido}
    </motion.button>
  );
}

export default Boton;
