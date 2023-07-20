import { useState, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import style from './burger-ingredients.module.css';
import { constants } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { IState } from '../../services/initialState';

const BurgerIngredients: FC = () => {
    const [current, setCurrent] = useState<string>('buns');

    const getIngredientsList = (state: IState) => state.ingredients.ingredientsList;
    const { mains, buns, sauces } = useSelector(getIngredientsList);

    const dispatch = useDispatch();
    useEffect(() => {
      getIngredients(`${constants.URL}/ingredients`)(dispatch)
    }, [dispatch]);

    const scroll = (type: string) => document.getElementById(type)?.scrollIntoView({behavior: "smooth", block: "start"});
    const [ refBuns, inViewBuns ] = useInView({
      threshold: 0,
    });
    const [ refSauces, inViewSauces ] = useInView({
      threshold: 0,
    });
    const [ refMains, inViewMains ] = useInView({
      threshold: 0,
    });

    useEffect(() => {
      if (inViewBuns) {
        setCurrent('buns');
      } else if (inViewSauces) {
        setCurrent('sauces');
      } else if (inViewMains) {
        setCurrent('mains');
      }
    }, [inViewBuns, inViewSauces, inViewMains]);

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
                <div className='mt-5 mb-5' id='buns' ref={refBuns}>
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
                <div className='mt-5 mb-5' id='sauces' ref={refSauces}>
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
                <div className='mt-5 mb-5' id='mains' ref={refMains}>
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
