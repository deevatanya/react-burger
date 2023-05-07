import { getData } from '../../utils/requests';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const CHANGE_COUNT_BUN = 'CHANGE_COUNT_BUN';
export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';
export const REMOVE_COUNTS = 'REMOVE_COUNTS';

export function getIngredients(URL) {
    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
      getData(URL).then(res => {
        if (res && res.success) {
        const countable = res.data.map((i) => {
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