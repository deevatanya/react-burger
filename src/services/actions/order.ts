import { postData } from '../../utils/requests';

export const POST_ORDER_REQUEST: string = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: string = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: string = 'POST_ORDER_FAILED';

export function postOrder(URL: string, body: { ingredients: [string] }) {
  return function(dispatch: any) {
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
