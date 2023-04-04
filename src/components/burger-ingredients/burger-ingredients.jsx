import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import style from './burger-ingredients.module.css';

function BurgerIngredients({ ingredients }) {
    const [current, setCurrent] = React.useState('one');
    const mains = ingredients.filter((obj) => obj.type === 'main');
    const buns = ingredients.filter((obj) => obj.type === 'bun');
    const sauces = ingredients.filter((obj) => obj.type === 'sauce');

    return (
        <div className={style.column}>

            <div className='mt-10'></div>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
   

            <div style={{display: 'flex'}} className='mt-5 mb-5'>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <section>
                <div className='mt-5 mb-5'>
                    <p className="text text_type_main-medium">
                        Булки
                    </p>
                    <div className={style.fold}>
                        {buns.map(bun => (
                            <IngredientCard key={bun._id} image={bun.image} price={bun.price} name={bun.name} type={bun.type}/>
                        ))}
                    </div>
                </div>
                <div className='mt-5 mb-5'>
                    <p className="text text_type_main-medium">
                        Соусы
                    </p>
                    <div className={style.fold}>
                        {sauces.map(sauce => (
                            <IngredientCard key={sauce._id} image={sauce.image} price={sauce.price} name={sauce.name} type={sauce.type}/>
                        ))}
                    </div>
                </div>           
                <div className='mt-5 mb-5'>
                    <p className="text text_type_main-medium">
                        Начинки
                    </p>
                    <div className={style.fold}>
                        {mains.map(main => (
                            <IngredientCard key={main._id} image={main.image} price={main.price} name={main.name} type={main.type}/>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BurgerIngredients;