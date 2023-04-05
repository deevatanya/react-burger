import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { data } from '../../utils/data';
import { optionalConstructorData } from '../../utils/optionalConstructorData';

function App() {
  const [ingredients] = React.useState(data);
  const [constructorCart] = React.useState(optionalConstructorData);

  return (
    <div className="app">
      <AppHeader />
      <div className='app-content'>
        <BurgerIngredients ingredients={ingredients}/>
        <BurgerConstructor constructorCart={constructorCart}/>
      </div>
    </div>
  );
}

export default App;
