import { Routes } from '@angular/router';

export const CHALLENGES_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./challenge-detail/challenge-detail.component').then(m => m.ChallengeDetailComponent)
  }, 
  {
    path: '',
    loadComponent: () => import('./challenge-list/challenge-list.component').then(m => m.ChallengeListComponent)
  }
]; 
