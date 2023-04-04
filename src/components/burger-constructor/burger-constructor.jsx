import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import style from './burger-constructor.module.css';

function BurgerConstructor({ constructorCart }) {
    const bunItem = useMemo(() => constructorCart.find((obj) => obj.type === 'bun'), [constructorCart]);
    const unLockedItems = useMemo(() => constructorCart.filter((obj) => obj.type === 'main' || obj.type === 'sauce'), [constructorCart]);
    return (
        <div className={style.column}>
            <div className='mt-25'></div>
            <section>
                <div className={style.item}>
                    <div className='ml-8 top'>
                        <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bunItem.name}
                        price={bunItem.price}
                        thumbnail={bunItem.image}
                        >
                        </ConstructorElement>
                    </div>
                </div>   
                        
                {unLockedItems.map(i => (
                   <ConstructorItem name={i.name} price={i.price} image={i.image} key={i._id} />
                ))}

                <div className={style.item}>
                    <div className='ml-8 bottom'>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bunItem.name}
                            price={bunItem.price}
                            thumbnail={bunItem.image}
                            >
                        </ConstructorElement>
                    </div>  
                </div>
            </section>

            <div className='mt-10'></div>
            <div className={style.total}>
                <div className={style.price}>
                    <p className="text text_type_main-large mr-2">
                        600
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={style.button}>            
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
      )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
    constructorCart: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
      })).isRequired
};
