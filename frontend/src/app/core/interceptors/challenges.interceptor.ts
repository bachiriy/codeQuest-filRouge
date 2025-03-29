import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const challengeInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  
  return next(req).pipe(
    tap(response => {
      console.log('Response from:', req.url, response);
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('Error from:', req.url, error);
      
      if (error.status === 401) {
        console.log('Unauthorized request, updating auth state');
      }
      
      return throwError(() => error);
    })
  );
}; 
