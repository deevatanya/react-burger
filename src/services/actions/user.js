
import { postAuth, getAuth, patchUserAuth } from '../../utils/requests';
import { deleteCookie, setCookie, getCookie } from "../../utils/cookie";

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';

export const POST_RESET_PASS_SUCCESS = 'POST_RESET_PASS_SUCCESS';

export function getUser(URL) {
  return function(dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    getAuth(URL).then(res => {
      if (res && res.success) {
        dispatch({
          type: AUTH_SUCCESS,
          isAuth: true,
          info: res.user,
        });
      } else {
        dispatch({
          type: AUTH_FAILED
        });
      }
    });
  };
};

export function patchUser(URL, form) {
  return function(dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    patchUserAuth(URL, form).then(res => {
      if (res && res.success) {
        dispatch({
          type: AUTH_SUCCESS,
          isAuth: true,
          info: res.user,
        });
      } else {
        dispatch({
          type: AUTH_FAILED
        });
      }
    });
  };
};
export function postAuthLogin(URL, form) {
  return function(dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    postAuth(URL, form).then(res => {
      if (res && res.success) {
        setCookie('token', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch({
          type: AUTH_SUCCESS,
          isAuth: true,
          info: res.user,
        });
      } else {
        dispatch({
          type: AUTH_FAILED
        });
      }
    });
  };
};

export function postAuthLogout(URL) {
  return function(dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    const token = getCookie('token');
    postAuth(URL, { token: token }).then(res => {
      if (res && res.success) {
        dispatch({
          type: AUTH_SUCCESS,
          isAuth: false,
          info: {},
        });
        deleteCookie('token');
        deleteCookie('accessToken');
      } else {
        dispatch({
          type: AUTH_FAILED
        });
      }
    });
  };
};

export function postForgotPassword(URL, form) {
  return function(dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    postAuth(URL, form).then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_RESET_PASS_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTH_FAILED
        });
      }
    });
  };
}
