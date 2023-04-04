import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { data } from './utils/data';

function App() {
  const [ingredients, setIngredients] = React.useState(data);
  const [constructorCart, setConstructorCart] = React.useState([]);

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
