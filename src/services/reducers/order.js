import { POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS } from '../actions/order';
import { initialState } from '../initialState';

export const orderReducer = (state = initialState.order, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {  
      return {
        ...state,
        orderRequest: true,
        currentNumber: null
      };
    }
    case POST_ORDER_SUCCESS: {
      return { 
        ...state, 
        orderFailed: false, 
        orderRequest: false,
        orders: [...state.orders, action.orderData], 
        currentNumber: action.orderData.number
      };
    }
    case POST_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    default: {
      return state;
    }
  }
}