import userReducer from './user';
import * as types from '../../constants';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {}))
        .toEqual({
            isAuth: false,
            isResetPassword: false,
            authRequest: false,
            authFailed: false,
            data: {
                name: '',
                email: ''
            },
      })
  });

  it('should handle AUTH_REQUEST', () => {
    expect(userReducer(undefined, {
        type: types.AUTH_REQUEST,
    })).toEqual({
        isAuth: false,
        isResetPassword: false,
        authRequest: true,
        authFailed: false,
        data: {
            name: '',
            email: ''
        },
    });
  });

  it('should handle AUTH_SUCCESS', () => {
    expect(userReducer({
        isAuth: false,
        isResetPassword: false,
        authRequest: true,
        authFailed: false,
        data: {
            name: '',
            email: ''
        },
    }, {
        type: types.AUTH_SUCCESS,
        info: {
            name: 'name',
            email: 'd@mail.com'
        },
        isAuth: true
    })).toEqual({
        isAuth: true,
        isResetPassword: false,
        authRequest: false,
        authFailed: false,
        data: {
            name: 'name',
            email: 'd@mail.com'
        },
    });
  });

  it('should handle AUTH_FAILED', () => {
    expect(userReducer(undefined, {
        type: types.AUTH_FAILED,
    })).toEqual({
        isAuth: false,
        isResetPassword: false,
        authRequest: false,
        authFailed: true,
        data: {
            name: '',
            email: ''
        },
    });
  });

  it('should handle POST_RESET_PASS_SUCCESS', () => {
    expect(userReducer(undefined, {
        type: types.POST_RESET_PASS_SUCCESS,
    })).toEqual({
        isAuth: false,
        isResetPassword: true,
        authRequest: false,
        authFailed: false,
        data: {
            name: '',
            email: ''
        },
    });
  });

});