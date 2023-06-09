import { AUTH_FAILED, AUTH_REQUEST, AUTH_SUCCESS, POST_RESET_PASS_SUCCESS} from '../actions/user';
import { initialState } from '../initialState';

export const userReducer = (state = initialState.user, action) => {
    switch(action.type) {
        case AUTH_REQUEST: {  
            return {
              ...state,
              authRequest: true
            };
          }
          case AUTH_SUCCESS: {
            return { 
              ...state, 
              authFailed: false, 
              authRequest: false,
              isAuth: action.isAuth,
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
          case AUTH_FAILED: {
            return { ...state, authFailed: true, authRequest: false, isAuth: false };
          }
        default: {
            return state;
        }
    }
} 