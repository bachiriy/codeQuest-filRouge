import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import * as AuthActions from "./auth.actions";
import { AuthService } from "../../services/auth.service";
import { ROOT_EFFECTS_INIT } from "@ngrx/effects";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  // Add this effect to check auth status on app initialization
  initAuthCheck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => 
        this.authService.checkAuthStatus().pipe(
          map(user => AuthActions.loadUserSuccess({ user })),
          catchError(error => of(AuthActions.loadUserFailure({ error: error.message || 'Not authenticated' })))
      )
    )
  ));

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => {
            const errorMessage = typeof error === 'string' 
              ? error 
              : error.message || 'Login failed';
            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ firstName, email, password, lastName }) =>
        this.authService.register(firstName, email, password, lastName).pipe(
          map(user => AuthActions.registerSuccess({ user })),
          catchError(errorMessage => of(AuthActions.registerFailure({ error: errorMessage })))
        )
      )
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(() => {
          this.router.navigate(["/dashboard"]);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        exhaustMap(() => this.authService.logout()),
        tap(() => {
          this.router.navigate(["/auth/login"]);
        })
      ),
    { dispatch: false }
  );

  // Optional: Add navigation for failed auth checks
  authCheckFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loadUserFailure),
        tap(() => {
          if (this.router.url.startsWith('/dashboard')) {
            this.router.navigate(['/auth/login']);
          }
        })
      ),
    { dispatch: false }
  );
}