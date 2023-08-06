import type { Middleware, MiddlewareAPI } from 'redux';
import type {TWSActions } from '../services/actions/socket';
import type { AppDispatch, RootState } from '../services/types/index';
import { getCookie } from './cookie';

export const socketMiddleware = (wsUrl: string): Middleware => {

    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch } = store;
      const { type, payload } = action;
      let accessToken: string | undefined = getCookie('accessToken');
      if (type === 'WS_CONNECTION_START') {
        if (window.location.pathname === '/profile/orders') {
          socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken?.substring(7)}`);
        } else {
          socket = new WebSocket(wsUrl);
        }
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: 'WS_GET_MESSAGE', payload: data });
        };

        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;

          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
}; 