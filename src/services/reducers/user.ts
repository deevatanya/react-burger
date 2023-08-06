import { AUTH_FAILED, AUTH_REQUEST, AUTH_SUCCESS, POST_RESET_PASS_SUCCESS} from '../constants';
import { initialState, IState } from '../initialState';
import { TUserActions } from '../actions/user';

export const userReducer = (state: IState['user'] = initialState.user, action: TUserActions) => {
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
            return {
              ...state,
              authFailed: false, 
              authRequest: false,
              isAuth: false,
              isResetPassword: true
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