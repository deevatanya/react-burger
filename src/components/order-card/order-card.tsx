import { FC, useMemo } from "react";
import { IMessage } from "../../services/initialState";
import style from './order-card.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ORDER_DETAILS } from '../../services/constants/index';
import { IState } from "../../services/initialState";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { constants } from '../../constants';

const { PATH } = constants;
export const OrderCard: FC<IMessage> = ({number, status, _id, createdAt, ingredients, name}) => {
    const getIngredientsList = (state: IState) => state.ingredients.ingredientsList;
    const { mains, buns, sauces} = useSelector(getIngredientsList);
    const location = useLocation();
    const dispatch = useDispatch();
    const totalPrice = useMemo<number>(() => {
        let sum: number = 0;
        if (ingredients) {
            ingredients.map((id) => {
                //@ts-ignore
                return sum += [...mains, ...buns, ...sauces]?.find((item) => item._id === id)?.price;
            })
        }
        return sum;
    }, [ingredients, mains, buns, sauces])

    const handleClick = () => {
        dispatch({type: SET_ORDER_DETAILS, orderData: { number, status, _id, createdAt, name, ingredients }});
    };

    return (
        <Link
            key={_id}
            to={{pathname: 
                `${location.pathname === PATH.FEED ? `/feed/${_id}` : `/profile/orders/${_id}`}`
            }}
            onClick={handleClick}
            style={{textDecoration: 'none', color: 'white'}}>
            <div className={style.card}>
                <div className={style.title}>
                    <p className="text text_type_main-medium" >
                        #{number}
                    </p>
                    <p className="text text_type_main-default text_color_inactive" >
                        <FormattedDate date={new Date(createdAt)} />
                    </p>
                </div>
                <div className="pt-6"></div>
                <p className="text text_type_main-medium">
					{name}
			    </p>

                <div className="pt-6"></div>
                <div className={style.components}>
                    <div>
                        { ingredients  ? (ingredients.map((id: string) => (
                            <img 
                                src={[...mains, ...buns, ...sauces]?.find((item) => item._id === id)?.image_mobile} 
                                alt='mobile'
                            >
                            </img>
                        ))) : null }
                    </div>
                    <div className="pt-6"></div>
                    <div className={style.price}>
                        <p className="text text_type_main-medium" >
                            {totalPrice}
                        </p>
                        <div className='pr-2'></div>
                        <CurrencyIcon type="primary" />
                    </div>
                    
                </div>
                        
            </div>
        </Link>
    )
}