import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Boton from "../Boton/Boton";
import "./BotonMenu.css";

function BotonMenu({
    label,
    tipo = "boton_dashboard",
    iconRight,          // icono del botón principal (opcional)
    iconLeft,           // icono del botón principal (opcional)
    iconSize = 24,
    opciones = [],      // [{ label, to?, onClick?, icon? }]
    align = "left",     // "left" | "right"
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // 1) Cerrar si haces click fuera del componente
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target)) setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 2) Helpers para abrir/cerrar
    const abrir = () => setOpen(true);
    const cerrar = () => setOpen(false);
    const toggle = () => setOpen((v) => !v);

    return (
        <div
            ref={ref}
            className="boton-menu"
            onMouseEnter={abrir}     // hover abre
            onMouseLeave={cerrar}    // hover sale cierra
        >
            {/* Botón principal */}
            <Boton
                tipo={tipo}
                onClick={toggle}       // click alterna (útil para móvil)
                iconRight={iconRight}
                iconLeft={iconLeft}
                iconSize={iconSize}
            >
                {label}
            </Boton>

            {/* Menú flotante */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className={`menu-panel ${align === "right" ? "right" : "left"}`}
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                    >
                        {opciones.map((op, idx) => (
                            <Boton
                                key={idx}
                                tipo="menu_item"
                                to={op.to}
                                iconLeft={op.icon}
                                anim={false} // para que no haga scale dentro del menú (se ve más pro)
                                onClick={() => {
                                    // Si trae acción, la ejecuta
                                    op.onClick?.();
                                    // Cierra menú siempre al seleccionar
                                    cerrar();
                                }}
                            >
                                {op.label}
                            </Boton>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default BotonMenu;
