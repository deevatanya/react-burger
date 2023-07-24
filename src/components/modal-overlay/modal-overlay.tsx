import { FC } from 'react';
import style from './modal-overlay.module.css';

const ModalOverlay:FC<{ onClose: () => void; }> = ({ onClose }) => {
    return (
        <div className={style.overlay} onClick={onClose}></div>
    )
}

export default ModalOverlay;
