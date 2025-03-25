import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated, selectUser } from '../../store/auth/auth.selectors';
import { logout } from '../../store/auth/auth.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: false,
  template: `
    <nav class="bg-[#161b22] border-b border-gray-700">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Left side -->
          <div class="flex items-center">
            <a routerLink="/" class="text-white font-bold text-xl">CodeQuest</a>
          </div>

          <!-- Right side -->
          <div class="flex items-center">
            <ng-container *ngIf="isAuthenticated$ | async; else authButtons">
              <div class="flex items-center space-x-4">
                <div *ngIf="user$ | async as user" class="text-gray-300">
                  {{ user.firstName }}
                </div>
                <button
                  (click)="onLogout()"
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </div>
            </ng-container>
            
            <ng-template #authButtons>
              <div class="space-x-4">
                <a
                  routerLink="/auth/login"
                  class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
                <a
                  routerLink="/auth/register"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Register
                </a>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(private store: Store) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.user$ = this.store.select(selectUser);
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
} 