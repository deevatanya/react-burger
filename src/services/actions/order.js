import { postData } from '../../utils/utils';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export function postOrder(URL, body) {
  return function(dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    postData(URL, body).then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderData: {
            ...body,
            number: res.order.number,
            name: res.name
          }
        });
      } else {
        dispatch({
          type: POST_ORDER_FAILED
        });
      }
    });
  };
};
