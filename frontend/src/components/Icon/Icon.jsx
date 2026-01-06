import Modelo from "./Iconos/Modelo";
import Dataset from "./Iconos/Dataset";


const ICONS = {
    modelo: Modelo,
    dataset: Dataset,
};

export default function Icon({ name, size = 18, className = "" }) {
    const Cmp = ICONS[name];
    if (!Cmp) return null;
    return <Cmp size={size} className={className} />;
}
