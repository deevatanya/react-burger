import { useState, useMemo, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import style from './burger-ingredients.module.css';
import { constants } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

function BurgerIngredients() {
    const [current, setCurrent] = useState('buns');
    const ingredients = useSelector(state => state.ingredients.ingredientsList);

    const dispatch = useDispatch();
    useEffect(() => {
      if(!ingredients.length) dispatch(getIngredients(`${constants.URL}/ingredients`))
    }, [dispatch, ingredients]);

    const mains = useMemo(() => ingredients.filter((obj) => obj.type === 'main'), [ingredients]);
    const buns = useMemo(() => ingredients.filter((obj) => obj.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter((obj) => obj.type === 'sauce'), [ingredients]);
    const scroll = (type) => document.getElementById(type).scrollIntoView({behavior: "smooth", block: "start"});

    return (
        <div className={style.column}>

            <div className='mt-10'></div>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
   

            <div style={{display: 'flex'}} className='mt-5 mb-5'>
                <Tab value="buns" active={current === 'buns'} onClick={() => {
                    setCurrent('buns'); 
                    scroll('buns')
                    }}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={() => {
                    setCurrent('sauces'); 
                    scroll('sauces')
                    }}>
                    Соусы
                </Tab>
                <Tab value="mains" active={current === 'mains'} onClick={() => {
                    setCurrent('mains'); 
                    scroll('mains')
                    }}>
                    Начинки
                </Tab>
            </div>

            <section>
                <div className='mt-5 mb-5' id='buns' >
                    <p className="text text_type_main-medium" >
                        Булки
                    </p>
                    <div className={style.fold}>
                        {buns.map(bun => (
                            <IngredientCard 
                                key={bun._id} 
                                info={bun} 
                            />
                        ))}
                    </div>
                </div>
                <div className='mt-5 mb-5' id='sauces' >
                    <p className="text text_type_main-medium">
                        Соусы
                    </p>
                    <div className={style.fold}>
                        {sauces.map(sauce => (
                            <IngredientCard 
                                key={sauce._id}
                                info={sauce} 
                            />
                        ))}
                    </div>
                </div>           
                <div className='mt-5 mb-5' id='mains' >
                    <p className="text text_type_main-medium">
                        Начинки
                    </p>
                    <div className={style.fold}>
                        {mains.map(main => (
                            <IngredientCard 
                                key={main._id} 
                                info={main} 
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BurgerIngredients;
