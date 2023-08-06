import { POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS, SET_ORDER_DETAILS } from '../constants';
import { initialState, IState } from '../initialState';
import { TOrderActions } from '../actions/order';

export const orderReducer = (state: IState['order'] = initialState.order, action: TOrderActions) => {
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
    case SET_ORDER_DETAILS: {
      return { 
        ...state, 
        orderData: {
          ...state.orderData,
          ...action.orderData
        } 
      };
    }
    default: {
      return state;
    }
  }
}