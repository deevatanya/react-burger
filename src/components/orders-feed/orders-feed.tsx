import { FC } from 'react';
import style from './orders-feed.module.css';
import { useSelector } from 'react-redux';
import { IMessage, IState } from '../../services/initialState';
import { OrderCard } from '../order-card/order-card';

export const OrdersFeed: FC = () => {
  const getMessages = (state: IState) => state.ws.messages;
  const messages = useSelector(getMessages);

    return (
        <div className={style.column}>

            <div className='mt-10'></div>
            <p className="text text_type_main-large">
                Лента заказов
            </p>

            <section>
            { messages && messages.length ? (messages.map((i: IMessage) => (
                    <OrderCard 
                        UUID={i.UUID}
                        number={i.number}
                        status={i.status}
                        _id={i._id}
                        createdAt={i.createdAt}
                        ingredients={i.ingredients}
                        name={i.name}
                    />
                ))) : null }
            </section>
        </div>
    )
}