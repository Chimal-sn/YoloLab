import { useRef } from "react";
import "./Campo_foto.css";

function FotoEditable({ fotoPreview, onFileSelected }) {
    const fileInputRef = useRef(null);

    const abrirSelector = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="avatar">
            <img className="avatar_img" src={fotoPreview} alt="Foto de perfil" />

            <button
                type="button"
                className="avatar_edit"
                onClick={abrirSelector}
                aria-label="Editar foto"
            >
                ✎
            </button>

            <input
                ref={fileInputRef}
                className="avatar_input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) onFileSelected(file);
                }}
            />
        </div>
    );
}

export default FotoEditable;
