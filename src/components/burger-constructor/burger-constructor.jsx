import React from 'react';
import { DragIcon, CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-constructor.module.css';

function BurgerConstructor() {
    return (
        <div className={style.column}>
            <div className='mt-25'></div>

            <section>
                <div className={style.item}>
                    <div className='ml-8'>
                        <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={20}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    >
                    </ConstructorElement></div>
                </div>
                <div className={style.item}>
                    <div className='mr-3'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Соус традиционный галактический"
                        price={30}
                        thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}
                    >
                    </ConstructorElement>
                </div>
                <div className={style.item}>
                    <div className='mr-3'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Мясо бессмертных моллюсков Protostomia"
                        price={30}
                        thumbnail={'https://code.s3.yandex.net/react/code/meat-02.png'}
                    >
                    </ConstructorElement>
                </div>
                <div className={style.item}>
                    <div className='mr-3'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Мясо бессмертных моллюсков Protostomia"
                        price={30}
                        thumbnail={'https://code.s3.yandex.net/react/code/meat-02.png'}
                    >
                    </ConstructorElement>
                </div>
                <div className={style.item}>
                    <div className='mr-3'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Плоды Фалленианского дерева"
                        price={80}
                        thumbnail={'https://code.s3.yandex.net/react/code/sp_1.png'}
                        >
                    </ConstructorElement>
                </div>
                <div className={style.item}>
                    <div className='mr-3'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Хрустящие минеральные кольца"
                        price={80}
                        thumbnail={'https://code.s3.yandex.net/react/code/mineral_rings.png'}
                        >
                    </ConstructorElement>
                </div>
                <div className={style.item}>
                    <div className='mr-3'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Хрустящие минеральные кольца"
                        price={80}
                        thumbnail={'https://code.s3.yandex.net/react/code/mineral_rings.png'}
                        >
                    </ConstructorElement>
                </div>
                <div className={style.item}>
                    <div className='ml-8'>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={20}
                            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
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