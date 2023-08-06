import { store } from "../../index";
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TConstructorActions } from '../actions/constructor';
import { TUserActions } from "../actions/user";
import { TIngredientDetailsActions } from '../actions/ingredientDetails';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import type {TWSActions } from '../actions/socket';

export type AppActions = TConstructorActions | TUserActions
| TIngredientDetailsActions | TIngredientsActions
| TOrderActions | TWSActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type RootState = ReturnType<typeof store.getState>; 
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
