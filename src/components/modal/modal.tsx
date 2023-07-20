import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

//@ts-ignore
const modalRoot: Element | DocumentFragment = document.getElementById("react-modals");
const escapeKeyCode = 27;

const Modal: FC<{
    onClose: () => void;
    header?: string;
    children: any;
}> = ({ onClose, children, header }) => {
    React.useEffect(() => {
        const close = (e: {keyCode: number}) => {
          if (e.keyCode === escapeKeyCode) {
            onClose();
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[onClose]);

    return createPortal(
        (
            <>
                <div className={style.card}>
                    <div className={style.header}>
                        <p className="text text_type_main-large">
                            { header }
                        </p>
                        <div onClick={onClose} className={style.close} >
                            <CloseIcon type="primary"  />
                        </div>
                        
                    </div>
                    { children }
                </div>
                <ModalOverlay onClose={onClose}/>
            </>

        ), 
        modalRoot
    );
}

export default Modal;
