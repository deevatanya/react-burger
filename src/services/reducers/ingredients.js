import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, INCREASE_COUNT, DECREASE_COUNT } from '../actions/ingredients';
import { initialState } from '../initialState';

export const ingredientsReducer = (state = initialState.ingredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {  
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredientsFailed: false, ingredientsList: action.ingredients, ingredientsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case INCREASE_COUNT: {
      return {
        ...state,
        ingredientsList: [...state.ingredientsList].map(item =>
          item.id === action.id ? { ...item, count: ++item.count } : item
        )
      };
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        ingredientsList: [...state.ingredientsList].map(item =>
          item.id === action.id ? { ...item, count: --item.count } : item
        )
      };
    }
    default: {
      return state;
    }
  }
}