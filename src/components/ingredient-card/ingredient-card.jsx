import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import style from './ingredient-card.module.css';
import { 
    SET_INGREDIENT_DETAILS, 
    REMOVE_INGREDIENT_DETAILS 
} from '../../services/actions/ingredientDetails';

function IngredientCard({ info }) {
  const [modalVisible, setModalVisible] = React.useState({ visible: false });
  const { image, price, name, type, count } = info;
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setModalVisible({ visible: true });
    dispatch({type: SET_INGREDIENT_DETAILS, info});
  };
  const handleCloseModal = () => {
    setModalVisible({ visible: false });
    dispatch({type: REMOVE_INGREDIENT_DETAILS, info});
  };

  const ingredientUUID = uuidv4();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { 
      ...info,
      uuid: ingredientUUID
    }
  });

  const modalHeader = 'Детали ингредиента';
  const modalIngs = (
    <Modal onClose={handleCloseModal} header={modalHeader}> 
      <IngredientDetails />
    </Modal>
  );

  return (
    <>
      { modalVisible.visible ? modalIngs : null }
      <div className={`${style.body} ml-3 mr-3 mt-4 mb-4`} ref={dragRef} onClick={handleOpenModal}>

        { count ? (
        <div className={style.counter}>
          <Counter count={count} size="default" extraClass="m-1" />
        </div>
        ) : null }

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
