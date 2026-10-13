import { useEffect } from "react";

function ConfirmModal({ title, message, confirmText = "Aceptar", onConfirm, onCancel }) {
  // Esc cierra la ventana
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="modal-title">{title}</h2>
        <p>{message}</p>

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="modal-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;