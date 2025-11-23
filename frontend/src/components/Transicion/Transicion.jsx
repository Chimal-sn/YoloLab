import { motion } from "framer-motion";

// Definimos la forma de la ola con SVG path
// Esto crea una curva suave en el borde derecho
const wavePath = "M0,0 L100,0 L100,100 L0,100 Z"; // Rectángulo base (se puede modificar para curva compleja)

// Colores sugeridos para efecto "mar" o tu paleta original
const waveColor = "#3A7AFE"; // Tu verde original
// const waveColor = "#0ea5e9"; // Azul tipo océano (Tailwind sky-500)

function PageTransition({ children }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      
      {/* --- LA OLA (TRANSICIÓN) --- */}
      {/* Usamos un SVG para tener control total de la forma */}
      <motion.div
        initial={{ x: "-100%" }} // Empieza escondido a la izquierda
        animate={{ x: "100%" }}  // Se mueve hasta salir por la derecha (revelando el contenido)
        exit={{ x: "0%" }}       // Al irse la página, la ola vuelve a cubrir (o una segunda ola entra)
        transition={{
          duration: 1.2, // Duración más larga para sensación de fluidez
          ease: [0.22, 1, 0.36, 1], // Curva Bezier personalizada para sensación "líquida"
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 999,
          pointerEvents: "none", // Importante para poder cliquear a través cuando no está
        }}
      >
        {/* Parte sólida de la ola */}
        <div 
            style={{ 
                width: "100%", 
                height: "100%", 
                background: waveColor,
                position: "absolute",
                left: 0,
                top: 0
            }} 
        />
        
        {/* Cresta de la ola (Decoración SVG en el borde derecho) */}
        {/* Esto simula la curva del agua */}
        <div style={{ position: "absolute", right: "-150px", top: 0, height: "100%", width: "150px" }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", fill: waveColor }}>
                {/* Un path curvo simple para el borde */}
                <path d="M0 0 C 50 0 50 100 0 100 Z" /> 
            </svg>
        </div>
      </motion.div>

      {/* --- CONTENIDO DE LA PÁGINA --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }} // Retraso para que la ola cubra primero
      >
        {children}
      </motion.div>
    </div>
  );
}

export default PageTransition;