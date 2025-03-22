import { createReducer, on } from "@ngrx/store"
import type { User } from "../../models/user.model"
import * as AuthActions from "./auth.actions"

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
}

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user, token }) => {
    localStorage.setItem("token", token)
    return {
      ...state,
      user,
      token,
      isAuthenticated: true,
      loading: false,
      error: null,
    }
  }),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.registerSuccess, (state, { user, token }) => {
    localStorage.setItem("token", token)
    return {
      ...state,
      user,
      token,
      isAuthenticated: true,
      loading: false,
      error: null,
    }
  }),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, (state) => {
    localStorage.removeItem("token")
    return {
      ...state,
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    }
  }),

  on(AuthActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),

  on(AuthActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
)

