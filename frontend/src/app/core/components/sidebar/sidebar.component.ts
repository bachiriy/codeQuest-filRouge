import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="w-64 hidden lg:block bg-[#161b22] text-white h-full overflow-y-auto">
      <div class="p-4">
        <div class="mb-8">
          <div class="text-xs uppercase tracking-wider text-gray-400 mb-2">Menu</div>
          <nav class="space-y-1">
            <a routerLink="/dashboard" routerLinkActive="bg-[#0d1117] text-blue-400" 
              class="flex items-center px-3 py-2 rounded-md transition hover:bg-[#0d1117]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </a>
            <a routerLink="/challenges" routerLinkActive="bg-[#0d1117] text-blue-400" 
              class="flex items-center px-3 py-2 rounded-md transition hover:bg-[#0d1117]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
              Challenges
            </a>
            <a routerLink="/leaderboard" routerLinkActive="bg-[#0d1117] text-blue-400" 
              class="flex items-center px-3 py-2 rounded-md transition hover:bg-[#0d1117]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
              Leaderboard
            </a>
            <a routerLink="/profile" routerLinkActive="bg-[#0d1117] text-blue-400" 
              class="flex items-center px-3 py-2 rounded-md transition hover:bg-[#0d1117]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile
            </a>
          </nav>
        </div>
        
        <div class="mb-8">
          <div class="text-xs uppercase tracking-wider text-gray-400 mb-2">Social</div>
          <nav class="space-y-1">
            <a routerLink="/social/friends" routerLinkActive="bg-[#0d1117] text-blue-400" 
              class="flex items-center px-3 py-2 rounded-md transition hover:bg-[#0d1117]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Friends
            </a>
            <a routerLink="/social/messages" routerLinkActive="bg-[#0d1117] text-blue-400" 
              class="flex items-center px-3 py-2 rounded-md transition hover:bg-[#0d1117]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Messages
            </a>
          </nav>
        </div>
        
        <div>
          <div class="text-xs uppercase tracking-wider text-gray-400 mb-2">Stats</div>
          <div class="bg-[#0d1117] rounded-lg p-3 space-y-3">
            <div>
              <div class="text-xs text-gray-400">Challenges Completed</div>
              <div class="text-xl font-medium">27</div>
            </div>
            <div>
              <div class="text-xs text-gray-400">Current Rank</div>
              <div class="flex items-center">
                <span class="text-xl font-medium mr-2">42</span>
                <span class="text-xs text-green-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                  7
                </span>
              </div>
            </div>
            <div>
              <div class="text-xs text-gray-400">XP Points</div>
              <div class="text-xl font-medium">3,450</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  `,
})
export class SidebarComponent {}

