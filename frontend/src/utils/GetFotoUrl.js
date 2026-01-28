export function getFotoUrl(foto) {
    if (!foto) return null;

    if (foto.startsWith("http")) return foto;

    console.log(`${import.meta.env.VITE_API_URL}${foto}`);

    return `${import.meta.env.VITE_API_URL}${foto}`;

}