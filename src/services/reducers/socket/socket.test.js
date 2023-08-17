import wsReducer from './socket';
import * as types from '../../constants';

describe('ws reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {}))
        .toEqual({
            wsConnected: false,
            messages: []
      })
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(undefined, {
        type: types.WS_CONNECTION_SUCCESS,
    })).toEqual({
        wsConnected: true,
        messages: [],
        error: undefined
    });
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(wsReducer(undefined, {
        type: types.WS_CONNECTION_ERROR,
        payload: {
            code: '3',
            type: 'some error'
        }
    })).toEqual({
        wsConnected: false,
        messages: [],
        error: {
            code: '3',
            type: 'some error'
        }
    });
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(wsReducer({
        wsConnected: true,
        messages: [],
        error:  {
            code: '3',
            type: 'some error'
        }
    }, {
        type: types.WS_CONNECTION_CLOSED,
    })).toEqual({
        wsConnected: false,
        messages: [],
        error: undefined
    });
  });

  it('should handle WS_GET_MESSAGE', () => {
    const json = JSON.stringify( {success: true, orders: [{number: 1}, {number: 2}], total: 5, totalToday: 2});
    expect(wsReducer(undefined, {
        type: types.WS_GET_MESSAGE,
        payload: json
    })).toEqual({
        wsConnected: true,
        messages: [{number: 2}, {number: 1}],
        error: undefined,
        total: 5,
        totalToday: 2,
    });
  });

});