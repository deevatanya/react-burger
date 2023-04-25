import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className='app-content'>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </DndProvider>

    </div>
  );
}

export default App;
