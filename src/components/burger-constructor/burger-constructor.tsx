import { FC } from 'react';
import { useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Navigate } from 'react-router-dom';

import { 
  CurrencyIcon, 
  ConstructorElement, 
  Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import style from './burger-constructor.module.css';
import { constants } from '../../constants';
import { IState, IIngredient } from '../../services/initialState';

import { 
  ADD_UNLOCKED_INGREDIENT, 
  ADD_BUN_INGREDIENT, 
  DELETE_ALL_INGREDIENTS,
  UPDATE_UNLOCKED
} from '../../services/actions/constructor';
import { 
  CHANGE_COUNT_BUN, 
  INCREASE_COUNT, 
  REMOVE_COUNTS 
} from '../../services/actions/ingredients';
import { postOrder } from '../../services/actions/order';


const BurgerConstructor:FC = () => {
  interface IModal {
    visible: boolean;
  }

  const [modalVisible, setModalVisible] = useState<IModal>({ visible: false });
  const [orderAuth, setOrderAuth] = useState<boolean>(true);

  const dispatch = useDispatch();
  const getUnLockedItems = (state: IState) => state.constructor.unLocked;
  const getBunItem = (state: IState) => state.constructor.bun;
  const getAuthStatus = (state: IState) => state.user.isAuth;
  const unLocked = useSelector(getUnLockedItems);
  const bun = useSelector(getBunItem);
  const isAuth = useSelector(getAuthStatus);

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(info: IIngredient) {
      if (info.type === 'bun') {
        dispatch({
          type: ADD_BUN_INGREDIENT,
          info: info
        });
        dispatch({
          type: CHANGE_COUNT_BUN,
          id: info._id
        });
      } else {
        dispatch({
          type: ADD_UNLOCKED_INGREDIENT,
          info: info
        });
        dispatch({
          type: INCREASE_COUNT,
          id: info._id
        });
      };
    },
  });

  const totalPrice = useMemo<number>(() => {
    let sum = 0;
    if (unLocked.length) {
      sum += unLocked.reduce((a, j) => a + (j.price || 0), 0)
    } 
    if (bun.price) {
      sum += bun.price * 2
    } 
    return sum;
  }, [ bun, unLocked]);

  const handleOrderClick = () => {
    if (!isAuth) {
      setOrderAuth(false);
    } else {
      if (!bun.price) {
        alert('Выбери булку для своего бургера, не будь фитнес-занудой! :)');
      } else {
        const idsArray = unLocked.map(i => i._id);
        idsArray.unshift(bun._id);
        idsArray.push(bun._id);
  
        postOrder(
          `${constants.URL}${constants.PATH.ORDERS}`,
          { ingredients: idsArray }
        )(dispatch);
        handleOpenModal();
        dispatch({ type: DELETE_ALL_INGREDIENTS });
        dispatch({ type: REMOVE_COUNTS });
      }
    }
  };

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

  const moveListItem = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragItem = unLocked[dragIndex]
    const hoverItem = unLocked[hoverIndex]

    const updatedUnLocked = [...unLocked];
    updatedUnLocked[dragIndex] = hoverItem;
    updatedUnLocked[hoverIndex] = dragItem;
    
    dispatch({
      type: UPDATE_UNLOCKED,
      updatedUnLocked
    });
  }, [unLocked, dispatch]);
  
  if (!orderAuth) {
    return (
      <Navigate
        to={constants.PATH.LOGIN}
      />
    );
  };

  return (
    <>
      { modalVisible.visible ? modalOrder : null }
      <div className={style.column}>
          <div className='mt-25'></div>

          <section ref={drop}>
          { bun._id && (
            <div className={style.item}>
              <div className='ml-8 top'>
                  <ConstructorElement
                    type={"top"}
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
              </div>
            </div>   
          )}

            { unLocked.length ? (unLocked.map((i: IIngredient, index: number) => (
              <ConstructorItem 
                name={i.name} 
                price={i.price} 
                image={i.image} 
                key={i.uuid} 
                uuid={i.uuid} 
                _id={i._id} 
                index={index}
                moveListItem={moveListItem}
              />
            ))) : null }
  
          { bun._id && (
            <div className={style.item}>
              <div className='ml-8 bottom'>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
              </div>
            </div>
          )}
          </section>

          <div className='mt-10'></div>
          <div className={style.total}>
            <div className={style.price}>
                <p className="text text_type_main-large mr-2">
                  { totalPrice }
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <div className={style.button}>            
              <Button 
                htmlType="button" 
                type="primary" 
                size="medium" 
                onClick={handleOrderClick}
              >
                Оформить заказ
              </Button>
            </div>
          </div>
      </div>
    </>
  )
};

export default BurgerConstructor;
