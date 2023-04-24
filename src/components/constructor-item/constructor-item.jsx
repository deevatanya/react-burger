import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../constructor-item/constructor-item.module.css';
import { DELETE_INGREDIENT } from '../../services/actions/constructor';
import { useDispatch } from 'react-redux';

function ConstructorItem({ name, price, image, _id }) {
    const dispatch = useDispatch();

    const handleDeleteClick = (e) => {
        dispatch({
            type: DELETE_INGREDIENT,
            _id
        })
    }
    return (
        <div className={style.item} >
            <div className='mr-3' >
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={handleDeleteClick}
            > 
            </ConstructorElement>
        </div>
    )
}

export default ConstructorItem;

ConstructorItem.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired
};