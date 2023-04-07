import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals");

function Modal({ onClose, children, header }) {
    React.useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
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

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string,
};
