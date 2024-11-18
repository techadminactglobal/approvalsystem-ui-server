import * as LoginActions from '../actions/auth.actions';

export interface LoginState {
  isLoading: boolean;
  jwtToken: any;
  userData: any;
  error: any;
  isLoggedIn: boolean;
  userId: string;
}

export const initialLoginState = {
  isLoading: false,
  jwtToken: '',
  userData: null,
  error: null,
  isLoggedIn: false,
  userId: '',
};

export function LoginReducer(
  state: LoginState = initialLoginState,
  action: LoginActions.Actions
): LoginState {
  switch (action.type) {
    case LoginActions.LOGGING_IN:
      return { ...state, isLoading: true };
    case LoginActions.LOGGING_OUT:
      return { ...state, ...initialLoginState };
    case LoginActions.LOGGED_IN:
      const token = action.payload.jwtToken;
      const user = action.payload.mcdApplicationUser;
      const userId = action.payload.userId;
      const error = action.payload.error;
      return {
        ...state,
        jwtToken: token,
        userData: user,
        error: error,
        userId: userId,
        isLoggedIn: true
      };
      case LoginActions.GET_LOCAL_STORAGE:
        
        if (action.payload[1]){
          const user = action.payload[0]
          return {...state, jwtToken: user.jwtToken, userId: user.userId, error: user.error, userData: user.mcdApplicationUser, isLoggedIn: true}
        }
        return {...state, ...initialLoginState}
    default:
      return state;
  }
}
