import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, take } from 'rxjs/operators';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.checkAuthStatus().pipe(
    map(user => {
      if (!user) {
        return true;
      }
      if(user.roles[0].name === 'ROLE_ADMIN') {
          return router.createUrlTree(['/dashboard']);
      }
      return router.createUrlTree(['/x']);
    }),
    catchError(() => {
      return of(true);
    })
  );
};
