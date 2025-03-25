import { createAction, props } from "@ngrx/store"
import type { User } from "../../models/user.model"

export const login = createAction(
  "[Auth] Login", 
  props<{ email: string; password: string }>()
)

export const loginSuccess = createAction(
  "[Auth] Login Success", 
  props<{ user: User }>()
)

export const loginFailure = createAction(
  "[Auth] Login Failure", 
  props<{ error: string }>()
)

export const register = createAction(
  "[Auth] Register", 
  props<{ 
    firstName: string;
    email: string; 
    password: string;
    lastName?: string;
  }>()
)

export const registerSuccess = createAction(
  "[Auth] Register Success", 
  props<{ user: User }>()
)

export const registerFailure = createAction(
  "[Auth] Register Failure", 
  props<{ error: string }>()
)

export const logout = createAction("[Auth] Logout")

export const checkAuth = createAction("[Auth] Check Auth")

export const loadUser = createAction("[Auth] Load User")

export const loadUserSuccess = createAction(
  "[Auth] Load User Success", 
  props<{ user: User | null }>()
)

export const loadUserFailure = createAction(
  "[Auth] Load User Failure", 
  props<{ error: string }>()
)

