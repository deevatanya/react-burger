import { initialState } from "../initialState";
import { SET_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../actions/ingredientDetails';

export const ingredientDetailsReducer = (state = initialState.ingredientDetails, action) => {
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