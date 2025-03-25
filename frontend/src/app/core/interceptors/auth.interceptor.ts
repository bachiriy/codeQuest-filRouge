import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { loadUserFailure } from '../store/auth/auth.actions';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  
  console.log('🔄 Intercepting request to:', req.url);

  return next(req).pipe(
    tap(response => {
      console.log('✅ Response from:', req.url, response);
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('❌ Error from:', req.url, error);
      
      if (error.status === 401) {
        console.log('🚫 Unauthorized request, updating auth state');
        store.dispatch(loadUserFailure({ error: 'Not authenticated' }));
      }
      
      return throwError(() => error);
    })
  );
}; 