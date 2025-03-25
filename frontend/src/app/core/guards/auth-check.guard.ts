import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, tap } from 'rxjs';
import { loadUserSuccess, loadUserFailure } from '../store/auth/auth.actions';

export const authCheckGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const authService = inject(AuthService);

  return authService.checkAuthStatus().pipe(
    tap(user => store.dispatch(loadUserSuccess({ user }))),
    map(() => true),
    catchError(error => {
      store.dispatch(loadUserFailure({ error: 'Not authenticated' }));
      return of(true); // Still allow navigation to child routes
    })
  );
};