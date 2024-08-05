import React from 'react';
import CustomButton from './CustomButton';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>정말로 삭제하시겠습니까?</p>
                <div className="modal-buttons">
                    <CustomButton text='확인' onClick={onConfirm} />
                    <CustomButton text='취소' onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
