import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, exhaustMap, map, tap } from "rxjs/operators"
import { Router } from "@angular/router"
import * as AuthActions from "./auth.actions"
import { AuthService } from "../../services/auth.service"

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(response => AuthActions.loginSuccess(response)),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  )

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ username, email, password }) =>
        this.authService.register(username, email, password).pipe(
          map(response => AuthActions.registerSuccess(response)),
          catchError(error => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  )

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(({ user }) => {
          // Comment out navigation for now
          // this.router.navigate(["/dashboard"])
        }),
      ),
    { dispatch: false }
  )

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          // Comment out navigation for now
          // this.router.navigate(["/"])
        }),
      ),
    { dispatch: false }
  )

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      exhaustMap(() =>
        this.authService.getCurrentUser().pipe(
          map(user => AuthActions.loadUserSuccess({ user })),
          catchError(error => of(AuthActions.loadUserFailure({ error })))
        )
      )
    )
  )
}

