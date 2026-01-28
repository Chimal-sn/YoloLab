// Modal.jsx
import "./Modal.css";

function Modal({ isOpen, onClose, title, children, type = "default" }) {
    if (!isOpen) return null;

    return (
        <div className="modal_overlay">
            <div
                className={`${type}`}
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
