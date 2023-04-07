import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const urlIngrs = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [state, setState] = React.useState({ successGetData: false });
  const [ingredients, setIngredients] = React.useState([]);
  const [constructorCart, setConstructorCart] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(urlIngrs)
      .then(res => res.json())
      .then(data => {
        setState({ successGetData: data.success });
        setIngredients([...data.data]);

        //временно
        setConstructorCart([...data.data]);
      })
      .catch(e => {
        console.log('Ошибка запроса данных: ', e);
      });
  };

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
