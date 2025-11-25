import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Inicio from "./pages/Inicio/Inicio";
import Login from "./pages/Login/Login";
import Registrar from "./pages/Registrar/Registrar";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
