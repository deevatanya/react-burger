import ingredientsReducer from './ingredients/ingredients';
import constructorReducer from './constructor/constructor';
import ingredientDetailsReducer from './ingredientsDetails/ingredientDetails';
import { combineReducers } from 'redux';
import orderReducer from './order/order';
import userReducer from './user/user';
import wsReducer from './socket/socket';

export const rootReducer = combineReducers({
  constructorBurger: constructorReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer
});