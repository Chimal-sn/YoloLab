import { motion } from "framer-motion";

// Componente visual de la Ola (separado para limpieza)
const WaveOverlay = () => {
  const waveColor = "#3A7AFE"; // Tu color verde
  
  return (
    <motion.div
      // Lógica de animación:
      // Exit (página vieja se va): La ola entra de izquierda a centro (cubriendo)
      // Initial (página nueva llega): La ola empieza en el centro (cubriendo)
      // Animate (página nueva se muestra): La ola se va a la derecha (revelando)
      initial={{ x: "0%" }}     
      animate={{ x: "100%" }}   
      exit={{ x: "0%" }}      // Al salir, vuelve a cubrir la pantalla
      
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", // IMPORTANTE: Fixed para que no afecte el tamaño de tu página
        top: 0,
        left: 0,
        width: "100%", // Cubre la pantalla inicialmente
        height: "100vh",
        zIndex: 9999, // Siempre encima de todo
        pointerEvents: "none",
      }}
    >
      {/* Bloque solido de color */}
      <div style={{ width: "100%", height: "100%", background: waveColor, position: "relative" }}>
        
        {/* Borde curvo (izquierda) - para cuando la ola se va a la derecha */}
        {/* Nota: Para simplificar, usaremos un bloque sólido que barre. 
            Si quieres la curva perfecta en ambos lados, requeriría dos SVGs, 
            pero para "cubrir y descubrir" un bloque sólido que se desliza suele ser más limpio. */}
      </div>
    </motion.div>
  );
};

function PageTransition({ children }) {
  return (
    <>
      {/* La Ola es independiente del contenido */}
      <WaveOverlay />

      {/* Tu contenido: Sin estilos que alteren el tamaño */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: "100%" }} // Único estilo necesario para asegurar flujo
      >
        {children}
      </motion.div>
    </>
  );
}

export default PageTransition;