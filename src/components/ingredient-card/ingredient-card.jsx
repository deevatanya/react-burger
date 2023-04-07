import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-card.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';

function IngredientCard({ info }) {
    const [modalVisible, setModalVisible] = React.useState({ visible: false });
    const { image, price, name, type, calories, proteins, fat, carbohydrates, image_large } = info;

    const handleOpenModal = () => {
        setModalVisible({ visible: true });
    }
    const handleCloseModal = () => {
        setModalVisible({ visible: false });
    }

    const modalHeader = 'Детали ингредиента';
    const modalIngs = (
        <Modal onClose={handleCloseModal} header={modalHeader}> 
            <IngredientDetails 
                calories ={calories} 
                proteins={proteins} 
                fat={fat} 
                carbohydrates={carbohydrates}
                image={image_large} 
                type={type}
                name={name}
            />
        </Modal>
    );

    return (
        <>
            { modalVisible.visible ? modalIngs : null }
            <div className={`${style.body} ml-3 mr-3 mt-4 mb-4`}  onClick={handleOpenModal}>
                <div className={style.counter}>
                    <Counter count={1} size="default" extraClass="m-1" />
                </div>

                <img src={image} alt={type} />

                <div className={`${style.price} mt-1 mb-1`}>
                    <p className="text text_type_main-medium mr-2">
                        {price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                
                <div className={style.name}>
                    <p className="text text_type_main-small">
                        {name}
                    </p>
                </div>
            </div>
        </>
    )
}

export default IngredientCard;

IngredientCard.propTypes = {
    info: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string,
        __v: PropTypes.number
      }).isRequired
};