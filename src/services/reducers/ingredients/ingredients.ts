import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED, 
  CHANGE_COUNT_BUN, 
  INCREASE_COUNT, 
  DECREASE_COUNT,
  REMOVE_COUNTS
} from '../../constants';
import { initialState, IState } from '../../initialState';
import { TIngredientsActions } from '../../actions/ingredients';

export default function ingredientsReducer(state: IState['ingredients'] = initialState.ingredients, action: TIngredientsActions) {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {  
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { 
        ...state, 
        ingredientsFailed: false, 
        ingredientsRequest: false,
        ingredientsList: {
          buns: action.ingredients.filter((obj) => obj.type === 'bun'),
          mains: action.ingredients.filter((obj) => obj.type === 'main'),
          sauces: action.ingredients.filter((obj) => obj.type === 'sauce'),
        }
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case CHANGE_COUNT_BUN: {
      return {
        ...state,
        ingredientsList: {
          ...state.ingredientsList,
          buns: [...state.ingredientsList.buns].map(item => 
            item._id === action.id ? { ...item, count: 1 } : { ...item, count: 0 } )
        }
      };
    }
    case REMOVE_COUNTS: {
      return {
        ...state,
        ingredientsList: {
          ...state.ingredientsList,
          mains: [...state.ingredientsList.mains].map(item =>
            item.count !== 0 ? { ...item, count: 0 } : item ),
          sauces: [...state.ingredientsList.sauces].map(item =>
            item.count !== 0 ? { ...item, count: 0 } : item ),
          buns: [...state.ingredientsList.buns].map(item =>
            item.count !== 0 ? { ...item, count: 0 } : item )
        }
      };
    }
    case INCREASE_COUNT: {
      return {
        ...state,
        ingredientsList: {
          ...state.ingredientsList,
          mains: [...state.ingredientsList.mains].map(item =>
            item._id === action.id ? { ...item, count: ++item.count } : item ),
          sauces: [...state.ingredientsList.sauces].map(item =>
            item._id === action.id ? { ...item, count: ++item.count } : item )
        }
      };
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        ingredientsList: {
          ...state.ingredientsList,
          mains: [...state.ingredientsList.mains].map(item =>
            item._id === action.id ? { ...item, count: --item.count } : item ),
          sauces: [...state.ingredientsList.sauces].map(item =>
            item._id === action.id ? { ...item, count: --item.count } : item )
        }
      };
    }
    default: {
      return state;
    }
  }
}