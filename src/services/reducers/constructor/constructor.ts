import { 
  ADD_BUN_INGREDIENT, 
  ADD_UNLOCKED_INGREDIENT, 
  DELETE_INGREDIENT, 
  DELETE_ALL_INGREDIENTS,
  UPDATE_UNLOCKED
} from '../../constants';
import { initialState, IState } from '../../initialState';
import { TConstructorActions } from '../../actions/constructor';

export default function constructorReducer(state: IState['constructorBurger'] = initialState.constructorBurger, action: TConstructorActions) {
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
        bun: null,
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