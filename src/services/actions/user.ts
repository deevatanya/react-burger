
import { postAuth, getAuth, patchUserAuth } from '../../utils/requests';
import { deleteCookie, setCookie, getCookie } from "../../utils/cookie";
import {
  AUTH_REQUEST, 
  AUTH_SUCCESS,
  AUTH_FAILED,
  POST_RESET_PASS_SUCCESS
} from '../constants/index'

export interface IAuthRequestAction {
  readonly type: typeof AUTH_REQUEST;
}

export interface IAuthSuccessAction {
  readonly type: typeof AUTH_SUCCESS;
  readonly isAuth: boolean;
  readonly info: {name: string, email: string};
}

export interface IAuthFailedAction {
  readonly type: typeof AUTH_FAILED;
}

export interface IPostResetPassSuccessAction {
  readonly type: typeof POST_RESET_PASS_SUCCESS;
}

export type TUserActions = IAuthRequestAction
    | IAuthSuccessAction
    | IAuthFailedAction
    | IPostResetPassSuccessAction;

export function getUser(URL: string) {
  return function(dispatch: any) {
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

export function patchUser(URL: string, form: { email?: string, password?: string, name?: string }) {
  return function(dispatch: any) {
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
export function postAuthLogin(URL: string, form: { email: string, password: string, name?: string }) {
  return function(dispatch: any) {
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

export function postAuthLogout(URL: string) {
  return function(dispatch: any) {
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

export function postForgotPassword(URL: string, form: { password?: string, token?: string, email?: string }) {
  return function(dispatch: any) {
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
