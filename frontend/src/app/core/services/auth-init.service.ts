import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { loadUserSuccess, loadUserFailure } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthInitService {
  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  initializeAuth(): Promise<void> {
    console.log('🔍 Checking initial auth status...');
    return firstValueFrom(this.authService.checkAuthStatus())
      .then(user => {
        console.log('✅ Auth check success:', user);
        this.store.dispatch(loadUserSuccess({ user }));
      })
      .catch(() => {
        console.log('❌ Auth check failed: Not authenticated');
        this.store.dispatch(loadUserFailure({ error: 'Not authenticated' }));
      });
  }
} 