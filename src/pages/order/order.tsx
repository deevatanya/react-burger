import { FC, useMemo, useEffect } from 'react';
import style from './order.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../services/initialState';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, SET_ORDER_DETAILS } from '../../services/constants/index';

export const OrderPage: FC = () => {
    const currentId: string | undefined = useParams().id;
    const dispatch = useDispatch();
    const getIngredientsList = (state: IState) => state.ingredients.ingredientsList;
    const { mains, buns, sauces} = useSelector(getIngredientsList);
    const getOrderData = (state: IState) => state.order.orderData;
    const { number, status, createdAt, name, ingredients } = useSelector(getOrderData);
    const getws = (state: IState) => state.ws;
    const { messages } = useSelector(getws);

	useEffect(() => {
        dispatch({type: WS_CONNECTION_START});
		return () => {
		dispatch({type: WS_CONNECTION_CLOSED});
		};
		},
		[dispatch],
	);
	useEffect(() => {
        const info = messages.find((item) => item._id === currentId);
        dispatch({type: SET_ORDER_DETAILS, orderData: info});
     },[dispatch, currentId, messages]);

    const ruStatus = useMemo<string>(() => {
        let s: string = '';
        if (status === 'done') {
            s = 'Выполнен'
            } else if (status === 'created') {
            s = 'Отменен'
        } else s = 'Готовится'
        return s;
    }, [status]);

    const totalPrice = useMemo<number>(() => {
        let sum: number = 0;
        if (ingredients) {
            ingredients.map((id) => {
                return sum += [...mains, ...buns, ...sauces]?.find((item) => item._id === id)?.price || 0;
            })
        }
        return sum;
    }, [ingredients, mains, buns, sauces]);

    return (
        <>
            <div className={style.card}>
                <div className={style.title}>
                    <p className="text text_type_digits-default">#{number}</p>
                </div>
                <div className='pt-10'></div>

                <div>
                    <p className="text text_type_main-medium">
                        {name}
                    </p>
                    <div className='pt-3'></div>
                    <p className={`text text_type_main-default ${style.status}`}>
                        {ruStatus}
                    </p>
                    <div className='pt-15'></div>
                    <p className="text text_type_main-medium">
                        Состав
                    </p>
                    <div className='pt-6'></div>
                    <div className={style.section}>
                        { ingredients  ? (ingredients.map((id: string) => (
                            <div className={style.row}>
                                <img 
                                    src={[...mains, ...buns, ...sauces]?.find((item) => item._id === id)?.image_mobile} 
                                    alt='mobile'
                                >
                                </img>
                                <p className="text text_type_main-default">
                                { [...mains, ...buns, ...sauces]?.find((item) => item._id === id)?.name}
                                </p>
                                <div className={`${style.price} pr-6`}>
                                    <p className="text text_type_digits-default">{ [...mains, ...buns, ...sauces]?.find((item) => item._id === id)?.price}</p>
                                    <div className='pr-2'></div>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        ))) : null }
                    </div>
                    <div className='pt-10'></div>
                </div>

                <div className={style.footer}>
                    <p className="text text_type_main-default text_color_inactive" >
                        <FormattedDate date={new Date(createdAt)} />
                    </p>

                    <div className={style.price}>
                        <p className="text text_type_digits-default">{totalPrice}</p>
                        <div className='pr-2'></div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </>
    )
};
