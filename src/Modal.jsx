import React from 'react';
import './Modal.css';
import ErrorOutline from '@mui/icons-material/ErrorOutline';

const Modal = ({ children, onClose, disableClose = false, isError = false }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Botón de cierre */}
                {!disableClose && (
                    <button className="modal-close-icon" onClick={onClose}>
                        &#x2715;
                    </button>
                )}

                {/* Indicador de error */}
                {isError && (
                    <div className="modal-error-indicator">
                        <ErrorOutline className="error-icon" style={{fontSize:"50px"}}/>
                        <p className="error-text">Se ha producido un error</p>
                    </div>
                )}

                {children}
            </div>
        </div>
    );
};

export default Modal;