import { FC, useMemo } from 'react';
import style from './order.module.css';
import { useSelector } from 'react-redux';
import { IState } from '../services/initialState';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderPage: FC = () => {
    const getIngredientsList = (state: IState) => state.ingredients.ingredientsList;
    const { mains, buns, sauces} = useSelector(getIngredientsList);
    const getOrderData = (state: IState) => state.order.orderData;
    const { number, status, createdAt, name, ingredients } = useSelector(getOrderData);

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
                //@ts-ignore
                return sum += [...mains, ...buns, ...sauces]?.find((item) => item._id === id)?.price;
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
