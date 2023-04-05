import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../constructor-item/constructor-item.module.css';

function ConstructorItem({ name, price, image }) {
    return (
        <div className={style.item} >
            <div className='mr-3' >
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
            > 
            </ConstructorElement>
        </div>
    )
}

export default ConstructorItem;

ConstructorItem.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};