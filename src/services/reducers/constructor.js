import { 
  ADD_BUN_INGREDIENT, 
  ADD_UNLOCKED_INGREDIENT, 
  DELETE_INGREDIENT, 
  DELETE_ALL_INGREDIENTS,
  UPDATE_UNLOCKED
} from '../actions/constructor';
import { initialState } from '../initialState';

export const constructorReducer = (state = initialState.constructor, action) => {
  switch (action.type) {
    case DELETE_INGREDIENT: {
      return { 
        ...state, 
        unLocked: [...state.unLocked].filter(item => item.uuid !== action.uuid),
      };
    }
    case ADD_UNLOCKED_INGREDIENT: {
      return {
        ...state,
        unLocked: [...state.unLocked, action.info],
      };
    }
    case ADD_BUN_INGREDIENT: {
      return {
        ...state,
        bun: {...action.info},
      };
    }
    case DELETE_ALL_INGREDIENTS: {
      return {
        bun: {},
        unLocked: [],
      };
    }
    case UPDATE_UNLOCKED: {
      return {
        ...state,
        unLocked: action.updatedUnLocked
      }
    }
    default: {
      return state;
    }
  }
}