import { POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS, SET_ORDER } from '../actions/order';
import { initialState } from '../initialState';

export const orderReducer = (state = initialState.order, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {  
      return {
        ...state,
        orderRequest: true
      };
    }
    case POST_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, orderNumber: action.orderNumber, orderRequest: false };
    }
    case SET_ORDER: {
      return { ...state, orderBody: action.orderBody };
    }
    case POST_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    default: {
      return state;
    }
  }
}