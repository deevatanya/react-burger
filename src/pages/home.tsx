import { FC } from 'react';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const HomePage: FC = () => {
  return (
      <div className="app">
        <DndProvider backend={HTML5Backend}>
        <div className='app-content'>
            <BurgerIngredients />
            <BurgerConstructor />
        </div>
        </DndProvider>
    </div>
  );
}
