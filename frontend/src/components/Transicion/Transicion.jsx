import { motion } from "framer-motion";

const WaveOverlay = () => {
  const waveColor = "#3A7AFE"; 
  
  return (
    <motion.div
      initial={{ x: "0%" }}     
      animate={{ x: "100%" }}   
      exit={{ x: "0%" }}      
      
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", 
        top: 0,
        left: 0,
        width: "100%", 
        height: "100vh",
        zIndex: 9999, 
        pointerEvents: "none",
      }}
    >
      <div style={{ width: "100%", height: "100%", background: waveColor, position: "relative" }}>
      
      </div>
    </motion.div>
  );
};

function PageTransition({ children }) {
  return (
    <>
      <WaveOverlay />

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