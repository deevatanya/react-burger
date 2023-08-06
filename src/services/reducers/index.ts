import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsReducer } from './ingredientDetails';
import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { userReducer } from './user';
import { wsReducer } from './socket';

export const rootReducer = combineReducers({
  constructor: constructorReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer
});