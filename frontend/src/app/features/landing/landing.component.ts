import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="p-4">
      <h1 class="text-2xl mb-4 text-white">Welcome to CodeQuest</h1>
      <nav class="space-y-2">
        <div><a routerLink="/auth/login" class="text-blue-500 hover:underline">Login</a></div>
        <div><a routerLink="/auth/register" class="text-blue-500 hover:underline">Register</a></div>
        <div><a routerLink="/dashboard" class="text-blue-500 hover:underline">Dashboard</a></div>
        <div><a routerLink="/challenges" class="text-blue-500 hover:underline">Challenges</a></div>
        <div><a routerLink="/profile" class="text-blue-500 hover:underline">Profile</a></div>
        <div><a routerLink="/leaderboard" class="text-blue-500 hover:underline">Leaderboard</a></div>
      </nav>
    </div>
  `
})
export class LandingComponent {} 