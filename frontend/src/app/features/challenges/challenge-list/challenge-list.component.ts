import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import type { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { map } from "rxjs/operators"
import type { Challenge } from "../../../core/models/challenge.model"
import { loadChallenges } from "../../../core/store/challenges/challenges.actions"
import { selectAllChallenges, selectChallengesLoading } from "../../../core/store/challenges/challenges.selectors"

@Component({
  selector: "app-challenge-list",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="p-4 md:p-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 class="text-2xl font-bold text-white mb-4 md:mb-0">Coding Challenges</h1>
        
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div class="relative">
            <input [(ngModel)]="searchQuery" 
              class="w-full md:w-64 px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search challenges"
              (input)="applyFilters()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute right-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          <div class="flex space-x-2">
            <select [(ngModel)]="selectedDifficulty" (change)="applyFilters()" 
              class="px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            
            <select [(ngModel)]="selectedCategory" (change)="applyFilters()" 
              class="px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Categories</option>
              <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
            </select>
          </div>
        </div>
      </div>
      
      <div *ngIf="loading$ | async" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <div *ngIf="!(loading$ | async) && (filteredChallenges$ | async)?.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 2L2 22"></path>
          <path d="M6.58 6.59l8.83 8.82"></path>
          <circle cx="10" cy="10" r="8"></circle>
        </svg>
        <h2 class="text-xl font-medium text-white mb-2">No challenges found</h2>
        <p class="text-gray-400">Try changing your search criteria</p>
      </div>
      
      <div *ngIf="(filteredChallenges$ | async)?.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div *ngFor="let challenge of filteredChallenges$ | async" 
          class="bg-[#1c2128] border border-gray-700 hover:border-blue-500 rounded-lg shadow-md overflow-hidden transition">
          <div class="p-5">
            <div class="flex justify-between items-start mb-4">
              <h2 class="text-xl font-medium text-white">{{ challenge.title }}</h2>
              <span [ngClass]="{
                'bg-green-500/20 text-green-400': challenge.difficulty === 'Easy',
                'bg-yellow-500/20 text-yellow-400': challenge.difficulty === 'Medium',
                'bg-red-500/20 text-red-400': challenge.difficulty === 'Hard'
              }" class="px-2 py-1 text-xs rounded-full">
                {{ challenge.difficulty }}
              </span>
            </div>
            
            <p class="text-gray-300 mb-4 line-clamp-2">{{ challenge.description }}</p>
            
            <div class="flex justify-between items-center">
              <div class="flex space-x-2">
                <span class="px-2 py-1 bg-blue-600/10 text-blue-400 text-xs rounded-full">{{ challenge.category }}</span>
                <span class="px-2 py-1 bg-gray-700/30 text-gray-400 text-xs rounded-full">{{ challenge.points }} points</span>
              </div>
              <a [routerLink]="['/challenges', challenge.id]" class="text-blue-400 hover:text-blue-300">
                Solve →
              </a>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center text-sm text-gray-400">
              <div>Completed by {{ challenge.completedBy }} users</div>
              <div>{{ challenge.successRate }}% success rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChallengeListComponent implements OnInit {
  challenges$: Observable<Challenge[]>
  filteredChallenges$: Observable<Challenge[]>
  loading$: Observable<boolean>

  searchQuery = ""
  selectedDifficulty = "all"
  selectedCategory = "all"

  categories: string[] = []

  constructor(private store: Store) {
    this.challenges$ = this.store.select(selectAllChallenges)
    this.loading$ = this.store.select(selectChallengesLoading)
    this.filteredChallenges$ = this.challenges$
  }

  ngOnInit(): void {
    this.store.dispatch(loadChallenges())

    // Extract unique categories
    this.challenges$.subscribe((challenges) => {
      this.categories = [...new Set(challenges.map((c) => c.category))]
    })

    // Initial filter application
    this.applyFilters()
  }

  applyFilters(): void {
    this.filteredChallenges$ = this.challenges$.pipe(
      map((challenges) => {
        return challenges.filter((challenge) => {
          // Filter by search query
          const matchesSearch =
            this.searchQuery === "" ||
            challenge.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            challenge.description.toLowerCase().includes(this.searchQuery.toLowerCase())

          // Filter by difficulty
          const matchesDifficulty =
            this.selectedDifficulty === "all" || challenge.difficulty === this.selectedDifficulty

          // Filter by category
          const matchesCategory = this.selectedCategory === "all" || challenge.category === this.selectedCategory

          return matchesSearch && matchesDifficulty && matchesCategory
        })
      }),
    )
  }
}

