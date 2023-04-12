import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../../utils/utils';
import { constants } from '../../constants';

function App() {
  const [state, setState] = React.useState({ successGetData: false });
  const [ingredients, setIngredients] = React.useState([]);
  const [constructorCart, setConstructorCart] = React.useState([]);

  React.useEffect(() => {
    async function dataInit() {
      const data = await getData(constants.URL_INGREDIENTS);
    
      setState({ successGetData: data.success });
      setIngredients([...data.data]);
      //временно
      setConstructorCart([...data.data]);
    }

    dataInit();
  }, []);

  return (
    <div className="app">
      <AppHeader />
      { state.successGetData && ingredients &&
        <div className='app-content'>
          <BurgerIngredients 
            ingredients={ingredients}
          />
          <BurgerConstructor 
            constructorCart={constructorCart} 
          />
        </div>
      }
    </div>
  );
}

export default App;
