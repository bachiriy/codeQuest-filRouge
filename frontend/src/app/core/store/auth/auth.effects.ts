import { Injectable } from "@angular/core"
import { type Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { exhaustMap, tap } from "rxjs/operators"
import type { Router } from "@angular/router"
import * as AuthActions from "./auth.actions"

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

  // Since we don't have a real backend, we'll simulate the login process
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) => {
        // Simulate API call
        if (action.email === "user@example.com" && action.password === "password") {
          const mockUser = {
            id: 1,
            username: "john_doe",
            email: action.email,
            profilePic: "/assets/profile-pic.jpg",
            bio: "Passionate programmer and problem solver",
            joinDate: new Date("2023-01-15"),
            stats: {
              challengesCompleted: 27,
              rank: 42,
              xpPoints: 3450,
              favoriteLanguage: "JavaScript",
            },
          }
          return of(
            AuthActions.loginSuccess({
              user: mockUser,
              token: "mock-jwt-token",
            }),
          )
        } else {
          return of(
            AuthActions.loginFailure({
              error: "Invalid email or password",
            }),
          )
        }
      }),
    ),
  )

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap((action) => {
        // Simulate API call
        const mockUser = {
          id: 1,
          username: action.username,
          email: action.email,
          joinDate: new Date(),
          stats: {
            challengesCompleted: 0,
            rank: 0,
            xpPoints: 0,
          },
        }
        return of(
          AuthActions.registerSuccess({
            user: mockUser,
            token: "mock-jwt-token",
          }),
        )
      }),
    ),
  )

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(({ user }) => {
          this.router.navigate(["/dashboard"])
        }),
      ),
    { dispatch: false },
  )

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigate(["/"])
        }),
      ),
    { dispatch: false },
  )

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      exhaustMap(() => {
        // Simulate API call
        const token = localStorage.getItem("token")

        if (token) {
          const mockUser = {
            id: 1,
            username: "john_doe",
            email: "user@example.com",
            profilePic: "/assets/profile-pic.jpg",
            bio: "Passionate programmer and problem solver",
            joinDate: new Date("2023-01-15"),
            stats: {
              challengesCompleted: 27,
              rank: 42,
              xpPoints: 3450,
              favoriteLanguage: "JavaScript",
            },
          }
          return of(AuthActions.loadUserSuccess({ user: mockUser }))
        } else {
          return of(AuthActions.loadUserFailure({ error: "No token found" }))
        }
      }),
    ),
  )
}

