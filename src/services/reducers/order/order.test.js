import orderReducer from './order';
import * as types from '../../constants';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {}))
        .toEqual({
            orders: [],
            orderRequest: false,
            orderFailed: false,
            currentNumber: null,
            orderData: {
                ingredients: [],
                _id: '',
                status: '',
                number: NaN,
                createdAt: '',
                updatedAt: '',
                name: '',
            }
      })
  });

  it('should handle POST_ORDER_REQUEST', () => {
    expect(orderReducer(undefined, {
        type: types.POST_ORDER_REQUEST,
    })).toEqual({
        orders: [],
        orderRequest: true,
        orderFailed: false,
        currentNumber: null,
        orderData: {
            ingredients: [],
            _id: '',
            status: '',
            number: NaN,
            createdAt: '',
            updatedAt: '',
            name: '',
        }
    });
  });

  it('should handle POST_ORDER_SUCCESS', () => {
    expect(orderReducer({
        orders: [],
        orderRequest: true,
        orderFailed: false,
        currentNumber: null,
        orderData: {
            ingredients: [],
            _id: '',
            status: '',
            number: NaN,
            createdAt: '',
            updatedAt: '',
            name: '',
        }
    }, {
        type: types.POST_ORDER_SUCCESS,
        orderData: {
            ingredients: [''],
            _id: '123',
            status: 'done',
            number: 10,
            createdAt: '12.06.2023',
            updatedAt: '13.06.2023',
            name: 'bla',
        }
    })).toEqual({
        orders: [{
            ingredients: [''],
            _id: '123',
            status: 'done',
            number: 10,
            createdAt: '12.06.2023',
            updatedAt: '13.06.2023',
            name: 'bla',
        }],
        orderRequest: false,
        orderFailed: false,
        currentNumber: 10,
        orderData: {
            ingredients: [],
            _id: '',
            status: '',
            number: NaN,
            createdAt: '',
            updatedAt: '',
            name: '',
        }
    });
  });

  it('should handle POST_ORDER_FAILED', () => {
    expect(orderReducer(undefined, {
        type: types.POST_ORDER_FAILED,
    })).toEqual({
        orders: [],
        orderRequest: false,
        orderFailed: true,
        currentNumber: null,
        orderData: {
            ingredients: [],
            _id: '',
            status: '',
            number: NaN,
            createdAt: '',
            updatedAt: '',
            name: '',
        }
    });
  });

  it('should handle SET_ORDER_DETAILS', () => {
    expect(orderReducer({
        orders: [{
            ingredients: [''],
            _id: '123',
            status: 'done',
            number: 10,
            createdAt: '12.06.2023',
            updatedAt: '13.06.2023',
            name: 'bla',
        }],
        orderRequest: false,
        orderFailed: false,
        currentNumber: 10,
        orderData: {
            ingredients: [],
            _id: '',
            status: '',
            number: NaN,
            createdAt: '',
            updatedAt: '',
            name: '',
        }
    }, {
        type: types.SET_ORDER_DETAILS,
        orderData: {
            ingredients: [''],
            _id: '123',
            status: 'done',
            number: 10,
            createdAt: '12.06.2023',
            updatedAt: '13.06.2023',
            name: 'bla',
        }
    })).toEqual({
        orders: [{
            ingredients: [''],
            _id: '123',
            status: 'done',
            number: 10,
            createdAt: '12.06.2023',
            updatedAt: '13.06.2023',
            name: 'bla',
        }],
        orderRequest: false,
        orderFailed: false,
        currentNumber: 10,
        orderData: {
            ingredients: [''],
            _id: '123',
            status: 'done',
            number: 10,
            createdAt: '12.06.2023',
            updatedAt: '13.06.2023',
            name: 'bla',
        }
    });
  });

});