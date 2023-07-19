import { getData } from '../../utils/requests';

export const GET_INGREDIENTS_REQUEST: string = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: string = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: string = 'GET_INGREDIENTS_FAILED';
export const CHANGE_COUNT_BUN: string = 'CHANGE_COUNT_BUN';
export const INCREASE_COUNT: string = 'INCREASE_COUNT';
export const DECREASE_COUNT: string = 'DECREASE_COUNT';
export const REMOVE_COUNTS: string = 'REMOVE_COUNTS';

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