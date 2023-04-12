import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

function ModalOverlay({ onClose }) {
    return (
        <div className={style.overlay} onClick={onClose}></div>
    )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};
