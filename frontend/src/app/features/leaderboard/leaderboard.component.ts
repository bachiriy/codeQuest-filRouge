import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { loadLeaderboard } from "../../core/store/leaderboard/leaderboard.actions"
import {
  selectLeaderboardEntries,
  selectLeaderboardPeriod,
  selectLeaderboardLoading,
} from "../../core/store/leaderboard/leaderboard.selectors"
import type { LeaderboardEntry } from "../../core/models/leaderboard.model"

@Component({
  selector: "app-leaderboard",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 md:p-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 class="text-2xl font-bold text-white mb-4 md:mb-0">Leaderboard</h1>
        
        <div class="flex space-x-2">
          <button 
            (click)="changePeriod('weekly')" 
            [ngClass]="{'bg-blue-600 text-white': (period$ | async) === 'weekly', 'bg-[#1c2128] text-gray-300': (period$ | async) !== 'weekly'}"
            class="px-4 py-2 rounded-md transition">
            Weekly
          </button>
          <button 
            (click)="changePeriod('monthly')" 
            [ngClass]="{'bg-blue-600 text-white': (period$ | async) === 'monthly', 'bg-[#1c2128] text-gray-300': (period$ | async) !== 'monthly'}"
            class="px-4 py-2 rounded-md transition">
            Monthly
          </button>
          <button 
            (click)="changePeriod('all-time')" 
            [ngClass]="{'bg-blue-600 text-white': (period$ | async) === 'all-time', 'bg-[#1c2128] text-gray-300': (period$ | async) !== 'all-time'}"
            class="px-4 py-2 rounded-md transition">
            All Time
          </button>
        </div>
      </div>
      
      <div *ngIf="loading$ | async" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <div *ngIf="!(loading$ | async)" class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-[#161b22]">
              <tr>
                <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" class="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  XP Points
                </th>
                <th scope="col" class="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Challenges
                </th>
                <th scope="col" class="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Streak
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr *ngFor="let entry of entries$ | async; let i = index" 
                [ngClass]="{'bg-blue-500/10 border-l-4 border-blue-500': entry.username === currentUsername}"
                class="hover:bg-[#0d1117] transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div [ngClass]="{
                      'bg-yellow-500 text-black': i === 0,
                      'bg-gray-300 text-black': i === 1,
                      'bg-yellow-700 text-white': i === 2,
                      'bg-gray-700 text-gray-300': i > 2
                    }" class="flex items-center justify-center rounded-full w-6 h-6 text-sm font-medium">
                      {{ entry.rank }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {{ entry.username.charAt(0) | uppercase }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-white">{{ entry.username }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-white font-bold">
                  {{ entry.xpPoints.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                  {{ entry.challengesCompleted }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{ entry.streak }} days
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class LeaderboardComponent implements OnInit {
  entries$: Observable<LeaderboardEntry[]>
  period$: Observable<"all-time" | "weekly" | "monthly">
  loading$: Observable<boolean>
  currentUsername = "john_doe" // This would normally come from your auth state

  constructor(private store: Store) {
    this.entries$ = this.store.select(selectLeaderboardEntries)
    this.period$ = this.store.select(selectLeaderboardPeriod)
    this.loading$ = this.store.select(selectLeaderboardLoading)
  }

  ngOnInit(): void {
    this.store.dispatch(loadLeaderboard({ period: "all-time" }))
  }

  changePeriod(period: "all-time" | "weekly" | "monthly"): void {
    this.store.dispatch(loadLeaderboard({ period }))
  }
}

