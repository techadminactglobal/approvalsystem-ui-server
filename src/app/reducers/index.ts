import { ActionReducerMap } from '@ngrx/store';
import { LoginState, LoginReducer } from "./auth.reducer";

export const rootReducer = {};

export interface AppState {
    readonly loginReducer: LoginState;
};


export const reducers: ActionReducerMap<AppState, any> = {
    loginReducer: LoginReducer,
};