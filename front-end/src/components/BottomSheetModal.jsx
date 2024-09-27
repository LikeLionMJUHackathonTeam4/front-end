import React from 'react';
import '../styles/BottomSheetModal.css';  // 모달 스타일

const BottomSheetModal = ({ isOpen, toilet, onClose }) => {
    if (!isOpen || !toilet) return null;  // 모달이 열려 있지 않으면 렌더링하지 않음

    return (
        <div className={`bottom-sheet-modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h3>{toilet.name}</h3>
                <p>유형: {toilet.type}</p>
                <p>주소: {toilet.address ? toilet.address : '주소 정보 없음'}</p>  {/* 주소 표시 */}
                <button className='ModalButton' onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default BottomSheetModal;
