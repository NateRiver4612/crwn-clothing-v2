import { signInSuccess, signOutSuccess, signOutFailed, signInFailed, signUpFailed } from './user.action';
import { AnyAction } from 'redux';
import { UserData_type } from "./user.types";


export type USER_STATE_TYPE = {
  readonly currentUser: UserData_type | null,
  readonly isLoading: boolean,
  readonly error: Error | null,
}

const USER_INITIAL_STATE: USER_STATE_TYPE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const UserReducer = (state = USER_INITIAL_STATE, action: AnyAction):USER_STATE_TYPE => {
  if(signInSuccess.match(action)){
     return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
  }
  if(signOutSuccess.match(action)){
      return {
        ...state,
        currentUser: null,
        error: null,
      };
  }

  if(signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)){
     return {
        ...state,
        error: action.payload,
      };
  }

  return state;
};
