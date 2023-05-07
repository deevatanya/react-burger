import { POST_AUTH_FAILED, POST_AUTH_REQUEST, POST_AUTH_SUCCESS, POST_RESET_PASS_SUCCESS} from '../actions/user';
import { initialState } from '../initialState';

export const userReducer = (state = initialState.user, action) => {
    switch(action.type) {
        case POST_AUTH_REQUEST: {  
            return {
              ...state,
              authRequest: true
            };
          }
          case POST_AUTH_SUCCESS: {
            return { 
              ...state, 
              authFailed: false, 
              authRequest: false,
              isAuth: true,
              refreshToken: action.refreshToken,
              accessToken: action.accessToken,
              data: {
                ...action.info,
              }
            };
          }
          case POST_RESET_PASS_SUCCESS: {
            // пока ничего не делаем
            return {
              ...state,
              authFailed: false, 
              authRequest: false,
              isAuth: false
            }
          }
          case POST_AUTH_FAILED: {
            return { ...state, authFailed: true, authRequest: false, isAuth: false };
          }
        default: {
            return state;
        }
    }
} 