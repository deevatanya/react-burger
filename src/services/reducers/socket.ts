import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../constants';
  import type {TWSActions } from '../actions/socket';
import { initialState, IState, IMessage } from '../initialState';

  export const wsReducer = (state: IState['ws'] = initialState.ws, action: TWSActions) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true
        };

      case WS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false
        };

      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };

      case WS_GET_MESSAGE:
        const ordersParsed: {success: boolean, orders: IMessage[], total: number, totalToday: number} = JSON.parse(action.payload);

        return {
          ...state,
          error: undefined,
          messages: [...ordersParsed.orders.reverse()],
          total: ordersParsed.total,
          totalToday: ordersParsed.totalToday,
        };
      default:
        return state;
    }
  };