import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'challenges',
    loadChildren: () => import('./features/challenges/challenges.routes').then(m => m.CHALLENGES_ROUTES)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.routes').then(m => m.PROFILE_ROUTES)
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./features/leaderboard/leaderboard.routes').then(m => m.LEADERBOARD_ROUTES)
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
]; 