// Modal.jsx
import "./Modal.css";

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal_overlay" onClick={onClose}>
            <div
                className="modal_contenido"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón cerrar */}
                <button
                    className="modal_close"
                    onClick={onClose}
                    aria-label="Cerrar"
                    type="button"
                >
                    ✕
                </button>

                <div className="modal_header">
                    <h3>{title}</h3>
                </div>

                <div className="modal_body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
