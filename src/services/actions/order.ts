import { postData } from '../../utils/requests';
import {
  POST_ORDER_REQUEST, 
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  SET_ORDER_DETAILS
} from '../constants/index'
import { IMessage } from '../initialState';

export interface IPostOrderRequestAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly orderData: {number: number, name: string, ingredients: string[]};
}

export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface ISetOrderDetailsAction {
  readonly type: typeof SET_ORDER_DETAILS;
  readonly orderData: IMessage
}

export type TOrderActions = IPostOrderRequestAction
    | IPostOrderSuccessAction
    | IPostOrderFailedAction
    | ISetOrderDetailsAction;

export function postOrder(URL: string, body: { ingredients: string[] }) {
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
