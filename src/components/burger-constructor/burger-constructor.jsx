import { useState, useMemo, useContext } from 'react';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import style from './burger-constructor.module.css';
import { BurgerConstructorContext } from '../../services/burgerConstructorContext';
import { postData } from '../../utils/utils';
import { constants } from '../../constants';

function BurgerConstructor() {
    const [constructorCart] = useContext(BurgerConstructorContext);
    const [modalVisible, setModalVisible] = useState({ visible: false });
    const [orderNumber, setOrderNumber] = useState(null);

    const bunItem = useMemo(() => constructorCart.find((obj) => obj.type === 'bun'), [constructorCart]);
    const unLockedItems = useMemo(() => constructorCart.filter((obj) => obj.type !== 'bun'), [constructorCart]);

    const totalValue = useMemo(() => {
        const sum = unLockedItems.reduce((a, j) => a + (j.price || 0), 0) 
        return sum + bunItem.price * 2
        }, [
            bunItem, 
            unLockedItems
        ]
    );
    const handleOrderClick = () => {
        let idsArray = unLockedItems.map(i => i._id);
        idsArray.unshift(bunItem._id);
        idsArray.push(bunItem._id);
        const body = { "ingredients": idsArray };

        async function dataInit() {
            const data = await postData(`${constants.URL}/orders`, body);

            setOrderNumber(data.order.number);
            handleOpenModal();
          }
      
          dataInit();
    }

    const handleOpenModal = () => {
        setModalVisible({ visible: true });
    }
    const handleCloseModal = () => {
        setModalVisible({ visible: false });
    }

    const modalOrder = (
        <Modal onClose={handleCloseModal} > 
            <OrderDetails orderNumber={orderNumber}/>
        </Modal>
    );

    return (
        <>
            { modalVisible.visible ? modalOrder : null }
            <div className={style.column}>
                <div className='mt-25'></div>
                <section>
                    
                    <div className={style.item}>
                        <div className='ml-8 top'>
                            <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bunItem.name} (верх)`}
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
                                text={`${bunItem.name} (низ)`}
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

