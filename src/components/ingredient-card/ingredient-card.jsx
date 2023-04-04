import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-card.module.css';

function IngredientCard({ image, price, name, type }) {
    return (
        <div className={`${style.body} ml-3 mr-3 mt-4 mb-4`} >

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
    )
}

export default IngredientCard;
