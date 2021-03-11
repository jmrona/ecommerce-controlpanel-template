import React from 'react'
import { createPortal } from 'react-dom'

export const Modal = ({ children, title, isOpen, onClose }) => {
    if(!isOpen) return null;
    return createPortal(
        <div id="modal">
            <div className="modal__container">
                <div className="modal__header">
                    <h3 className="modal__header-title">
                        {title}
                    </h3>
                    <div className="modal-close">
                        <button onClick={onClose}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </div>
    ,document.body);
}
