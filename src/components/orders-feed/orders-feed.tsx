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
            { messages.length ? (messages.map((i: IMessage) => (
                    <OrderCard 
                        key={i._id}
                        info={i}
                    />
                ))) : null }
            </section>
        </div>
    )
}