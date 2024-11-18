import * as UsersActions from '../actions/auth.actions';
import { User } from '../modal/users.actions';

const INITIAL_STATE: User[] = [
  { id: 1, name: 'Fabio' },
  { id: 2, name: 'Lorenzo' },
  { id: 3, name: 'Silvia' },
  { id: 4, name: 'Lisa' }
];

export function UsersReducer (
  state: User[] = INITIAL_STATE, action: any
  ): any {

  switch (action.type) {
    case UsersActions.loginSuccess:
      return [...state, action.payload];

    case UsersActions.loginFailure:
      return 

    default:
      return [...state];
  }
}

