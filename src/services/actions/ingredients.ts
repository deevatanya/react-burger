import { getData } from '../../utils/requests';
import { IIngredient } from '../initialState'
import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CHANGE_COUNT_BUN,
  INCREASE_COUNT,
  DECREASE_COUNT,
  REMOVE_COUNTS,
} from '../constants/index';
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: IIngredient[];
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IChangeCountBunAction {
  readonly type: typeof CHANGE_COUNT_BUN;
  readonly id: string;
}

export interface IIncreaseCountAction {
  readonly type: typeof INCREASE_COUNT;
  readonly id: string;
}

export interface IDecreaseCountAction {
  readonly type: typeof DECREASE_COUNT;
  readonly id: string;
}

export interface IRemoveCountsAction {
  readonly type: typeof REMOVE_COUNTS;
}

export type TIngredientsActions = IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IChangeCountBunAction
    | IIncreaseCountAction
    | IDecreaseCountAction
    | IRemoveCountsAction;


export function getIngredients(URL: string) {
    return function(dispatch: any) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
      getData(URL).then(res => {
        if (res && res.success) {
        const countable = res.data.map((i: object) => {
            return {...i, count: 0}})
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: countable
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      });
    };
  }