import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, tap, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly AUTH_KEY = 'auth_data';

  constructor(private http: HttpClient, private router: Router) {}

  private handleError(error: HttpErrorResponse) {
    if (typeof error.error === 'string') {
      return throwError(() => error.error);
    }
    if (error.error?.message) {
      return throwError(() => error.error.message);
    }
    if (error?.message) {
      return throwError(() => error.message);
    }
    return throwError(() => 'An unexpected error occurred');
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, 
      { email, password },
      { withCredentials: true }
    ).pipe(
      map(response => {
        if (response === null || response.id === null) {
          throw new Error('ERROR Loggin in');
        }
        
        this.setAuthData(response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  register(firstName: string, email: string, password: string, lastName?: string): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, {
      firstName,
      lastName,
      email,
      password
    }).pipe(
      tap(response => {
        if (response.user) {
          this.setAuthData(response.user);
        }
      }),
      map(response => {
        if (response.user === null) {
          throw new Error('Registration failed');
        }
        return response.user;
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.clearAuthData();
      }),
      catchError(this.handleError)
    );
  }

  checkAuthStatus(): Observable<User | null> {
    return of(this.getAuthData());
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/verify`);
  }

  // Local storage helpers
  private setAuthData(user: User): void {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
  }

  private getAuthData(): User | null {
    const data = localStorage.getItem(this.AUTH_KEY);
    return data ? JSON.parse(data) : null;
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  // For initial state check
  getCurrentUser(): User | null {
    return this.getAuthData();
  }

  hasRole(roleName: string): Observable<boolean> {
    return this.checkAuthStatus().pipe(
      map(user => {
        if (!user || !user.roles) return false;
        return user.roles.some(role => role.name === roleName);
      })
    );
  }

}
