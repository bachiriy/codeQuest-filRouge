import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { selectIsAuthenticated, selectUser } from "../../store/auth/auth.selectors"
import { logout } from "../../store/auth/auth.actions"
import type { User } from "../../models/user.model"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-[#161b22] text-white shadow-lg sticky top-0 z-10">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <a routerLink="/" class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span class="text-xl font-bold tracking-tighter">Code Quest</span>
          </a>
        </div>
        
        <nav class="hidden md:flex items-center space-x-6">
          <a routerLink="/" class="text-gray-300 hover:text-white transition">Home</a>
          <a *ngIf="isAuthenticated$ | async" routerLink="/dashboard" class="text-gray-300 hover:text-white transition">Dashboard</a>
          <a *ngIf="isAuthenticated$ | async" routerLink="/challenges" class="text-gray-300 hover:text-white transition">Challenges</a>
          <a *ngIf="isAuthenticated$ | async" routerLink="/leaderboard" class="text-gray-300 hover:text-white transition">Leaderboard</a>
        </nav>
        
        <div class="flex items-center space-x-4">
          <ng-container *ngIf="isAuthenticated$ | async; else authLinks">
            <div class="relative group">
              <button class="flex items-center space-x-2 py-1 px-3 rounded-full border border-gray-700 hover:bg-gray-700 transition">
                <span class="text-sm">{{ (user$ | async)?.firstName }}</span>
                <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {{ (user$ | async)?.firstName?.charAt(0) | uppercase }}
                </div>
              </button>
              <div class="absolute right-0 top-full mt-2 w-48 bg-[#1c2128] rounded-md shadow-lg py-1 hidden group-hover:block">
                <a routerLink="/profile" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Profile</a>
                <a routerLink="/social/friends" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Friends</a>
                <a routerLink="/social/messages" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Messages</a>
                <button (click)="onLogout()" class="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Logout</button>
              </div>
            </div>
          </ng-container>
          
          <ng-template #authLinks>
            <a routerLink="/auth/login" class="py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md transition">Login</a>
            <a routerLink="/auth/register" class="py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-md transition">Register</a>
          </ng-template>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>
  user$: Observable<User | null>

  constructor(private store: Store) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
    this.user$ = this.store.select(selectUser)
  }

  onLogout(): void {
    this.store.dispatch(logout())
  }
}

