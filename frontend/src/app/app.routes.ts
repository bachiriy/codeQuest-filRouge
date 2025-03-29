import { Routes } from '@angular/router';
import { authCheckGuard } from './core/guards/auth-check.guard';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [authCheckGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'auth',
        canActivate: [guestGuard],
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'challenges',
        canActivate: [authGuard],
        loadChildren: () => import('./features/challenges/challenges.routes').then(m => m.CHALLENGES_ROUTES)
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadChildren: () => import('./features/profile/profile.routes').then(m => m.PROFILE_ROUTES)
      },
      {
        path: 'leaderboard',
        canActivate: [authGuard],
        loadChildren: () => import('./features/leaderboard/leaderboard.routes').then(m => m.LEADERBOARD_ROUTES)
      }
    ]
  }
]; 
