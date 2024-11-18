import { Action } from '@ngrx/store'

export const LOGGING_IN = '[LOGIN] LOGGING_IN';
export const LOGGING_OUT = '[LOGGING_OUT] LOGGING_OUT';
export const LOGGED_IN = '[LOGGED_IN] LOGGED_IN';
export const GET_LOCAL_STORAGE = '[GET_LOCAL_STORAGE] GET_LOCAL_STORAGE';

export class LoggingIn implements Action {
    readonly type = LOGGING_IN;
    constructor() {}
}

export class LoggingOut implements Action {
    readonly type = LOGGING_OUT;
    constructor() {}
}

export class LoggedIn implements Action {
    readonly type = LOGGED_IN;
    constructor(public payload: any) {}
}
export class GetLocalStorage implements Action {
    readonly type = GET_LOCAL_STORAGE;
    constructor(public payload: any) {}
}


export type Actions = LoggingIn | LoggingOut | LoggedIn | GetLocalStorage;