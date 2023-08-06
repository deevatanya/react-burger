import { FC, useEffect } from 'react';
import { OrdersFeed } from '../components/orders-feed/orders-feed';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/constants/index';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../services/initialState';
import style from './feed.module.css';

export const FeedPage: FC = () => {
	const dispatch = useDispatch();
    const getWS = (state: IState) => state.ws;
  	const ws = useSelector(getWS);

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
		 <div className='app-content'>
			<OrdersFeed/>
	
			<div className={`mt-20 ${style.info}`}>
				<div className={style.status}>
					<div>
						<p className="text text_type_main-medium">
							Готовы:
						</p>
						<div className='mt-6'>
							{ws.messages?.filter((mes) => mes.status === 'done').splice(0, 10).map((mes) => (
								<p key={mes._id} className={`${style.done} text text_type_digits-default`}>
								{(String(mes.number))}
								</p>
							))}
						</div>
					</div>
					<div>
						<p className="text text_type_main-medium">
							В работе:
						</p>
						<div className='mt-6'>
							{ws.messages?.filter((mes) => mes.status === 'pending').splice(0, 10).map((mes) => (
								<p key={mes._id} className="text text_type_digits-default">
								{(String(mes.number))}
								</p>
							))}
						</div>
					</div>
				</div>

				<div className={style.total}>
					<p className="text text_type_main-medium">
						Выполнено за все время:
					</p>
					<p className="text text_type_digits-large">{ws.total}</p>
				</div>
				<div className={style.total}>
					<p className="text text_type_main-medium">
						Выполнено за сегодня:
					</p>
					<p className="text text_type_digits-large">{ws.totalToday}</p>
				</div>
			</div>
		 </div>
		</>
	)
};
