import { FC, useEffect } from 'react';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { useSelector, useDispatch } from 'react-redux';
import { IMessage, IState } from '../services/initialState';
import { OrderCard } from '../components/order-card/order-card';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/constants/index';
import styles from './profile.module.css';

export const HistoryPage: FC = () => {
  const dispatch = useDispatch();
  const getWS = (state: IState) => state.ws;
  const { messages } = useSelector(getWS);

  useEffect(
    () => {
    dispatch({type: WS_CONNECTION_START});
    return () => {
    dispatch({type: WS_CONNECTION_CLOSED});
    };
    },
    [dispatch],
  );
  return (
    <>
      <ProfileMenu/>
      <div className={styles.section}>
        { messages && messages.length ? (messages.map((i: IMessage) => (
          <OrderCard 
              key={i._id}
              number={i.number}
              status={i.status}
              _id={i._id}
              createdAt={i.createdAt}
              ingredients={i.ingredients}
              name={i.name}
            />
          ))) : (<p className="text text_type_digits-medium">У Вас пока нет заказов</p>) }
      </div>
    </>

  );
} 
