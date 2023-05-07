
import { postAuth } from '../../utils/requests';

export const POST_AUTH_REQUEST = 'POST_AUTH_REQUEST';
export const POST_AUTH_SUCCESS = 'POST_AUTH_SUCCESS';
export const POST_AUTH_FAILED = 'POST_AUTH_FAILED';

export const POST_RESET_PASS_SUCCESS = 'POST_RESET_PASS_SUCCESS';

export function postAuthLogin(URL, form) {
  return function(dispatch) {
    dispatch({
      type: POST_AUTH_REQUEST
    });
    postAuth(URL, form).then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_AUTH_SUCCESS,
          info: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        });
      } else {
        dispatch({
          type: POST_AUTH_FAILED
        });
      }
    });
  };
};

export function postForgotPassword(URL, form) {
  return function(dispatch) {
    dispatch({
      type: POST_AUTH_REQUEST
    });
    postAuth(URL, form).then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_RESET_PASS_SUCCESS,
        });
      } else {
        dispatch({
          type: POST_AUTH_FAILED
        });
      }
    });
  };
}
