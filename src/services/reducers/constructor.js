import { ADD_BUN_INGREDIENT, ADD_UNLOCKED_INGREDIENT, DELETE_INGREDIENT } from '../actions/constructor';
import { initialState } from '../initialState';

export const constructorReducer = (state = initialState.constructor, action) => {
  switch (action.type) {
    case DELETE_INGREDIENT: {
      return { 
        ...state, 
        unLocked: [...state.unLocked].filter(item => item.id !== action._id) 
      };
    }
    case ADD_UNLOCKED_INGREDIENT: {
      return {
        ...state,
        unLocked: [...state.unLocked, action.info]
      };
    }
    case ADD_BUN_INGREDIENT: {
      return {
        ...state,
        bun: {...action.info}
      };
    }
    default: {
      return state;
    }
  }
}