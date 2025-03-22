import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { selectUser } from "../../core/store/auth/auth.selectors"
import type { User } from "../../core/models/user.model"

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4 md:p-6">
      <h1 class="text-2xl font-bold text-white mb-6">Profile</h1>
      
      <div *ngIf="user$ | async as user" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Info -->
        <div class="lg:col-span-1">
          <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden">
            <div class="p-6 text-center">
              <div class="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {{ user.username.charAt(0) | uppercase }}
              </div>
              <h2 class="text-xl font-bold text-white mb-1">{{ user.username }}</h2>
              <p class="text-gray-400 mb-4">{{ user.email }}</p>
              
              <div class="flex justify-center space-x-3 mb-6">
                <button class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition">
                  Edit Profile
                </button>
                <button class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition">
                  Settings
                </button>
              </div>
              
              <div class="border-t border-gray-700 pt-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-400">Member since</span>
                  <span class="text-white">{{ user.joinDate | date }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Status</span>
                  <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden mt-6">
            <div class="p-6">
              <h3 class="text-lg font-medium text-white mb-4">Bio</h3>
              <p class="text-gray-300 mb-4">{{ user.bio || 'No bio provided yet.' }}</p>
              
              <button class="text-blue-400 hover:text-blue-300 text-sm">
                Edit Bio
              </button>
            </div>
          </div>
          
          <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden mt-6">
            <div class="p-6">
              <h3 class="text-lg font-medium text-white mb-4">Social Links</h3>
              
              <div class="space-y-4">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <a href="#" class="text-blue-400 hover:text-blue-300">GitHub</a>
                </div>
                
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <a href="#" class="text-blue-400 hover:text-blue-300">LinkedIn</a>
                </div>
                
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                  <a href="#" class="text-blue-400 hover:text-blue-300">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Stats and Activity -->
        <div class="lg:col-span-2">
          <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden mb-6">
            <div class="p-6">
              <h3 class="text-lg font-medium text-white mb-4">Stats</h3>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-[#0d1117] p-4 rounded-lg text-center">
                  <div class="text-2xl font-bold text-white mb-1">{{ user.stats.challengesCompleted }}</div>
                  <div class="text-sm text-gray-400">Challenges Completed</div>
                </div>
                
                <div class="bg-[#0d1117] p-4 rounded-lg text-center">
                  <div class="text-2xl font-bold text-white mb-1">#{{ user.stats.rank }}</div>
                  <div class="text-sm text-gray-400">Current Rank</div>
                </div>
                
                <div class="bg-[#0d1117] p-4 rounded-lg text-center">
                  <div class="text-2xl font-bold text-white mb-1">{{ user.stats.xpPoints }}</div>
                  <div class="text-sm text-gray-400">XP Points</div>
                </div>
                
                <div class="bg-[#0d1117] p-4 rounded-lg text-center">
                  <div class="text-2xl font-bold text-white mb-1">{{ user.stats.favoriteLanguage || 'N/A' }}</div>
                  <div class="text-sm text-gray-400">Favorite Language</div>
                </div>
              </div>
              
              <h4 class="text-md font-medium text-white mb-3">Language Proficiency</h4>
              
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm text-gray-300">JavaScript</span>
                    <span class="text-sm text-gray-300">85%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 85%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm text-gray-300">Python</span>
                    <span class="text-sm text-gray-300">70%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: 70%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm text-gray-300">Java</span>
                    <span class="text-sm text-gray-300">45%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="bg-red-500 h-2 rounded-full" style="width: 45%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm text-gray-300">C++</span>
                    <span class="text-sm text-gray-300">30%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: 30%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden mb-6">
            <div class="p-6">
              <h3 class="text-lg font-medium text-white mb-4">Recent Achievements</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-[#0d1117] p-4 rounded-lg flex items-center space-x-4">
                  <div class="bg-yellow-500/20 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div class="text-white font-medium">First Blood</div>
                    <div class="text-sm text-gray-400">Solved your first challenge</div>
                  </div>
                </div>
                
                <div class="bg-[#0d1117] p-4 rounded-lg flex items-center space-x-4">
                  <div class="bg-blue-500/20 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-white font-medium">Consistent Learner</div>
                    <div class="text-sm text-gray-400">7 day streak completed</div>
                  </div>
                </div>
                
                <div class="bg-[#0d1117] p-4 rounded-lg flex items-center space-x-4">
                  <div class="bg-green-500/20 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-white font-medium">Algorithm Master</div>
                    <div class="text-sm text-gray-400">Completed 10 algorithm challenges</div>
                  </div>
                </div>
                
                <div class="bg-[#0d1117] p-4 rounded-lg flex items-center space-x-4">
                  <div class="bg-purple-500/20 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div>
                    <div class="text-white font-medium">Rising Star</div>
                    <div class="text-sm text-gray-400">Ranked in top 100 users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
              <h3 class="text-lg font-medium text-white mb-4">Recent Activity</h3>
              
              <div class="space-y-6">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="bg-blue-500/20 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-white font-medium">Completed "Two Sum" Challenge</div>
                    <div class="text-sm text-gray-400">3 hours ago</div>
                  </div>
                </div>
                
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="bg-green-500/20 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-white font-medium">Earned "Algorithm Master" Badge</div>
                    <div class="text-sm text-gray-400">Yesterday</div>
                  </div>
                </div>
                
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="bg-purple-500/20 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-white font-medium">Added coding_master as a friend</div>
                    <div class="text-sm text-gray-400">2 days ago</div>
                  </div>
                </div>
                
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="bg-yellow-500/20 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-white font-medium">Started 7-day streak</div>
                    <div class="text-sm text-gray-400">1 week ago</div>
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
export class ProfileComponent {
  user$: Observable<User | null>

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser)
  }

  ngOnInit(): void {
    // Any initialization logic
  }
}

