import { initialState, IState } from "../initialState";
import { SET_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../constants';
import { TIngredientDetailsActions } from '../actions/ingredientDetails';

export const ingredientDetailsReducer = (
    state: IState['ingredientDetails'] = initialState.ingredientDetails, 
    action: TIngredientDetailsActions
  ) => {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS: {
          return { 
            ...action.info 
          };
        }
        case REMOVE_INGREDIENT_DETAILS: {
            return {};
        }
        default: {
            return state;
          }
    }
}