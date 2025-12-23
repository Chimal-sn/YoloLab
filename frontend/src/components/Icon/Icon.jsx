import Modelo from "./Iconos/Modelo";

const ICONS = {
    modelo: Modelo,
};

export default function Icon({ name, size = 18, className = "" }) {
    const Cmp = ICONS[name];
    if (!Cmp) return null;
    return <Cmp size={size} className={className} />;
}
