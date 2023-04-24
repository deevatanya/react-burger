import { useState, useMemo } from 'react';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import { ADD_UNLOCKED_INGREDIENT, ADD_BUN_INGREDIENT } from '../../services/actions/constructor';
import { INCREASE_COUNT } from '../../services/actions/ingredients';
import { SET_ORDER } from '../../services/actions/order';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import style from './burger-constructor.module.css';
import { constants } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { postOrder } from '../../services/actions/order';

function BurgerConstructor() {
    const [modalVisible, setModalVisible] = useState({ visible: false });

    const dispatch = useDispatch();
    const unLocked = useSelector(state => state.constructor.unLocked);
    const bun = useSelector(state => state.constructor.bun);
    
 
    const [, drop] = useDrop({
        accept: "ingredient",
        drop(info) {
            if (info.type === 'bun') {
                dispatch({
                    type: ADD_BUN_INGREDIENT,
                    info: info
                }); 
            } else {
                dispatch({
                    type: ADD_UNLOCKED_INGREDIENT,
                    info: info
                });
            }
            dispatch({
                type: INCREASE_COUNT,
                id: info._id
            });
        },
    });

    const totalValue = useMemo(() => {
        if (unLocked.length || bun.price) {
            let sum = unLocked.reduce((a, j) => a + (j.price || 0), 0) 
            sum += bun.price * 2
            return sum
        } else {
            return 0
        }
    }, [
            bun, 
            unLocked,
        ]
    );

    const orderBody = useSelector((state) => state.order.orderBody)

    const handleOrderClick = () => {
        let idsArray = unLocked.map(i => i._id);
        idsArray.unshift(bun._id);
        idsArray.push(bun._id);
        dispatch({type: SET_ORDER, orderBody: { "ingredients": idsArray }});
        dispatch(postOrder(`${constants.URL}/orders`, orderBody));
        handleOpenModal();

    }

    const handleOpenModal = () => {
        setModalVisible({ visible: true });
    }
    const handleCloseModal = () => {
        setModalVisible({ visible: false });
    }

    const modalOrder = (
        <Modal onClose={handleCloseModal} > 
            <OrderDetails />
        </Modal>
    );

    return (
        <>
            { modalVisible.visible ? modalOrder : null }
            <div className={style.column}>
                <div className='mt-25'></div>

                <section ref={drop}>
                { bun._id &&
                (
                    <div className={style.item}>
                        <div className='ml-8 top'>
                            <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            >
                            </ConstructorElement>
                        </div>
                    </div>   )}
                            
                    { unLocked.length ? (unLocked.map(i => (
                        <ConstructorItem name={i.name} price={i.price} image={i.image} key={i._id} id={i._id}/>
                    ))) : null }

                { bun._id && 
                (
                    <div className={style.item}>
                        <div className='ml-8 bottom'>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                                >
                            </ConstructorElement>
                        </div>  
                    </div>
                )}

                </section>

                <div className='mt-10'></div>
                <div className={style.total}>
                    <div className={style.price}>
                        <p className="text text_type_main-large mr-2">
                            {totalValue}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div className={style.button}>            
                        <Button htmlType="button" type="primary" size="medium" onClick={handleOrderClick}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </div>
        </>
      )
}

export default BurgerConstructor;

