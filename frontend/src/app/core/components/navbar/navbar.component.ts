import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { selectIsAuthenticated, selectUser } from "../../store/auth/auth.selectors"
import { logout } from "../../store/auth/auth.actions"
import type { User } from "../../models/user.model"

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-gray-900 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <a routerLink="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Code Quest</span>
          </a>
        </div>
        
        <nav class="hidden md:flex items-center space-x-1">
          <a routerLink="/" 
             class="px-4 py-2 text-gray-300 hover:text-white transition rounded-lg hover:bg-gray-800/50">
            Home
          </a>
          <a *ngIf="isAuthenticated$ | async" 
             routerLink="/dashboard" 
             class="px-4 py-2 text-gray-300 hover:text-white transition rounded-lg hover:bg-gray-800/50">
            Dashboard
          </a>
          <a *ngIf="isAuthenticated$ | async" 
             routerLink="/challenges" 
             class="px-4 py-2 text-gray-300 hover:text-white transition rounded-lg hover:bg-gray-800/50">
            Challenges
          </a>
          <a *ngIf="isAuthenticated$ | async" 
             routerLink="/leaderboard" 
             class="px-4 py-2 text-gray-300 hover:text-white transition rounded-lg hover:bg-gray-800/50">
            Leaderboard
          </a>
        </nav>
        
        <div class="flex items-center space-x-4">
          <ng-container *ngIf="isAuthenticated$ | async; else authLinks">
            <div class="relative group">
              <button class="flex items-center space-x-2 py-1 px-3 rounded-full hover:bg-gray-800 transition">
                <span class="text-sm text-gray-200">{{ (user$ | async)?.firstName }}</span>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                  {{ (user$ | async)?.firstName?.charAt(0) | uppercase }}
                </div>
              </button>
              <div class="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-1 hidden group-hover:block border border-gray-700">
                <a routerLink="/profile" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/50">Profile</a>
                <a routerLink="/social/friends" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/50">Friends</a>
                <a routerLink="/social/messages" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/50">Messages</a>
                <div class="border-t border-gray-700 my-1"></div>
                <button (click)="onLogout()" class="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/50">Logout</button>
              </div>
            </div>
          </ng-container>
          
          <ng-template #authLinks>
            <a routerLink="/auth/login" class="py-2 px-4 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition">Login</a>
            <a routerLink="/auth/register" class="py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition shadow-md hover:shadow-blue-500/20">
              Register
            </a>
          </ng-template>
        </div>
      </div>
    </header>
  `,
})
export class NavbarComponent {
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