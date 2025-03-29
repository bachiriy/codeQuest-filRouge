import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { Store } from "@ngrx/store"
import { of, type Observable } from "rxjs"
import type { Challenge, ProgrammingLanguage } from "../../../core/models/challenge.model"
import { loadChallenge, submitSolution } from "../../../core/store/challenges/challenges.actions"
import {
  selectSelectedChallenge,
  selectChallengesLoading,
  selectSubmissions,
} from "../../../core/store/challenges/challenges.selectors"
import { CodeEditorComponent } from "../code-editor/code-editor.component"

@Component({
  selector: "app-challenge-detail",
  standalone: true,
  imports: [CommonModule, FormsModule, CodeEditorComponent],
  template: `
    <div class="p-4 md:p-6">
      <div *ngIf="loading$ | async" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <div *ngIf="!(loading$ | async) && !(challenge$ | async)" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2 class="text-xl font-medium text-white mb-2">Challenge not found</h2>
        <p class="text-gray-400">The challenge you're looking for doesn't exist or has been removed.</p>
      </div>
      
      <div *ngIf="challenge$ | async as challenge" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Challenge Description -->
        <div class="lg:col-span-1">
          <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden mb-6">
            <div class="p-5">
              <div class="flex justify-between items-start mb-4">
                <h1 class="text-2xl font-bold text-white">{{ challenge.title }}</h1>
                <span [ngClass]="{
                  'bg-green-500/20 text-green-400': challenge.difficulty === 'Easy',
                  'bg-yellow-500/20 text-yellow-400': challenge.difficulty === 'Medium',
                  'bg-red-500/20 text-red-400': challenge.difficulty === 'Hard'
                }" class="px-2 py-1 text-xs rounded-full">
                  {{ challenge.difficulty }}
                </span>
              </div>
              
              <div class="py-2 flex space-x-2 mb-4">
                <span class="px-2 py-1 bg-blue-600/10 text-blue-400 text-xs rounded-full">{{ challenge.category }}</span>
                <span class="px-2 py-1 bg-gray-700/30 text-gray-400 text-xs rounded-full">{{ challenge.points }} points</span>
              </div>
              
              <div class="prose prose-invert max-w-none mb-6">
                <p class="text-gray-300">{{ challenge.description }}</p>
              </div>
              
              <div class="bg-[#0d1117] rounded-md p-4 mb-6">
                <h3 class="text-md font-medium text-white mb-3">Example Test Cases</h3>
                
                <div *ngFor="let testCase of getVisibleTestCases(challenge)" class="mb-4 last:mb-0">
                  <div class="mb-2">
                    <span class="text-gray-400 text-sm">Input:</span>
                    <pre class="bg-[#161b22] p-2 rounded-md text-sm text-white font-mono mt-1">{{ testCase.input }}</pre>
                  </div>
                  <div>
                    <span class="text-gray-400 text-sm">Expected Output:</span>
                    <pre class="bg-[#161b22] p-2 rounded-md text-sm text-white font-mono mt-1">{{ testCase.expectedOutput }}</pre>
                  </div>
                </div>
              </div>
              
              <div class="bg-[#0d1117] rounded-md p-4">
                <h3 class="text-md font-medium text-white mb-3">Constraints</h3>
                <ul class="list-disc list-inside text-gray-300 space-y-1 text-sm">
                  <li>Your solution must run within the time limit</li>
                  <li>Your solution must not exceed the memory limit</li>
                  <li>All test cases must pass to receive points</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md p-5">
            <h3 class="text-md font-medium text-white mb-3">Statistics</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Completed by:</span>
                <span class="text-white">{{ challenge.completedBy }} users</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Success Rate:</span>
                <span class="text-white">{{ challenge.successRate }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Points:</span>
                <span class="text-white">{{ challenge.points }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Code Editor and Results -->
        <div class="lg:col-span-2">
          <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden mb-6">
            <div class="border-b border-gray-700 p-4 flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <select [(ngModel)]="selectedLanguage" class="px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option *ngFor="let lang of challenge.supportedLanguages" [value]="lang">{{ lang }}</option>
                </select>
                
                <div class="flex items-center space-x-2">
                  <span class="text-gray-400 text-sm">Theme:</span>
                  <select [(ngModel)]="editorTheme" class="px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>
              </div>
              
              <button (click)="onReset()" class="px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0d1117] rounded-md transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </button>
            </div>
            
            <app-code-editor 
              [language]="selectedLanguage" 
              [theme]="editorTheme"
              [(code)]="code"
              [height]="'500px'">
            </app-code-editor>
            
            <div class="border-t border-gray-700 p-4 flex justify-between">
              <button class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition">
                Run Tests
              </button>
              
              <button 
                (click)="onSubmit(challenge.id)" 
                [disabled]="isSubmitting"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg *ngIf="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" 
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Submit Solution
              </button>
            </div>
          </div>
          
          <div *ngIf="submissions$ | async as submissions">
            <div *ngIf="submissions.length > 0" class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden">
              <div class="border-b border-gray-700 p-4">
                <h3 class="text-md font-medium text-white">Submission Results</h3>
              </div>
              
              <div class="p-5">
                <div *ngFor="let submission of submissions.slice(0, 3)" class="mb-4 last:mb-0">
                  <div class="flex items-center space-x-2 mb-2">
                    <div [ngClass]="{
                      'bg-green-500/20 text-green-400': submission.status === 'Accepted',
                      'bg-red-500/20 text-red-400': submission.status !== 'Accepted'
                    }" class="p-2 rounded-full">
                      <svg *ngIf="submission.status === 'Accepted'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <svg *ngIf="submission.status !== 'Accepted'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                    <div>
                      <span class="font-medium text-white">{{ submission.status }}</span>
                      <span class="text-gray-400 text-sm ml-2">{{ submission.submittedAt | date:'medium' }}</span>
                    </div>
                  </div>
                  
                  <div class="bg-[#0d1117] rounded-md p-3">
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span class="text-gray-400">Language:</span>
                        <span class="text-white ml-2">{{ submission.language }}</span>
                      </div>
                      <div>
                        <span class="text-gray-400">Runtime:</span>
                        <span class="text-white ml-2">{{ submission.executionTime.toFixed(2) }} ms</span>
                      </div>
                      <div>
                        <span class="text-gray-400">Memory:</span>
                        <span class="text-white ml-2">{{ submission.memoryUsed.toFixed(2) }} MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChallengeDetailComponent implements OnInit {
    // TODO: load the actuall test & make a good editor maybe (or not actually idk)
  challenge$: Observable<Challenge | null> = of({
      id: 1,
      title: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      difficulty: "Easy",
      category: "Arrays",
      points: 100,
      supportedLanguages: ["Java", "Python", "JavaScript", "C++"],
      testCases: [
        {
          id: 1,
          input: "[2,7,11,15], target = 9",
          expectedOutput: "[0,1]",
          isHidden: false,
        },
        {
          id: 2,
          input: "[3,2,4], target = 6",
          expectedOutput: "[1,2]",
          isHidden: false,
        },
      ],
      createdAt: new Date("2023-01-10"),
      completedBy: 1250,
      successRate: 75.3,
    })

  loading$: Observable<boolean>
  submissions$: Observable<any[]>

  selectedLanguage: ProgrammingLanguage = "JavaScript"
  editorTheme: "dark" | "light" = "dark"
  code = ""
  isSubmitting = false

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    // this.challenge$ = this.store.select(selectSelectedChallenge)
    this.loading$ = this.store.select(selectChallengesLoading)
    this.submissions$ = this.store.select(selectSubmissions)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get("id"))
      if (id) {
        this.store.dispatch(loadChallenge({ id }))
      }
    })

    // Set initial code template based on selected language
    this.setCodeTemplate()

    // Update code template when challenge or language changes
    this.challenge$.subscribe((challenge) => {
      if (challenge) {
        this.selectedLanguage = challenge.supportedLanguages[0]
        this.setCodeTemplate()
      }
    })
  }

  getVisibleTestCases(challenge: Challenge) {
    return challenge.testCases.filter((testCase) => !testCase.isHidden)
  }

  onReset() {
    this.setCodeTemplate()
  }

  onSubmit(challengeId: number) {
    this.isSubmitting = true

    this.store.dispatch(
      submitSolution({
        challengeId,
        code: this.code,
        language: this.selectedLanguage,
      }),
    )

    // Simulate submission delay
    setTimeout(() => {
      this.isSubmitting = false
    }, 2000)
  }

  setCodeTemplate() {
    // Set default code templates based on the selected language
    switch (this.selectedLanguage) {
      case "JavaScript":
        this.code = `/**
 * Write your JavaScript solution here
 */
function solution(input) {
  // Your code here
  
  return result;
}

// Examples:
// console.log(solution([2, 7, 11, 15], 9)); // Expected: [0, 1]
`
        break
      case "Python":
        this.code = `"""
Write your Python solution here
"""
def solution(input):
    # Your code here
    
    return result

# Examples:
# print(solution([2, 7, 11, 15], 9))  # Expected: [0, 1]
`
        break
      case "Java":
        this.code = `/**
 * Write your Java solution here
 */
class Solution {
    public int[] solution(int[] nums, int target) {
        // Your code here
        
        return result;
    }
    
    // Examples:
    // solution(new int[]{2, 7, 11, 15}, 9) -> Expected: [0, 1]
}
`
        break
      case "C++":
        this.code = `/**
 * Write your C++ solution here
 */
#include <vector>

class Solution {
public:
    std::vector<int> solution(std::vector<int>& nums, int target) {
        // Your code here
        
        return result;
    }
    
    // Examples:
    // solution({2, 7, 11, 15}, 9) -> Expected: [0, 1]
};
`
        break
      default:
        this.code = "// Write your solution here"
    }
  }
}

