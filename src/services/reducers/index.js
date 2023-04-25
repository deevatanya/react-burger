import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsReducer } from './ingredientDetails';
import { combineReducers } from 'redux';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  constructor: constructorReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer
});