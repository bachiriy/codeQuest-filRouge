import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface Friend {
  id: number
  username: string
  profilePic?: string
  status: "online" | "offline" | "away"
  lastActive?: Date
  stats: {
    rank: number
    challengesCompleted: number
  }
}

@Component({
  selector: "app-friends",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4 md:p-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 class="text-2xl font-bold text-white mb-4 md:mb-0">Friends</h1>
        
        <div class="flex space-x-2 w-full md:w-auto">
          <div class="relative flex-grow md:flex-grow-0">
            <input [(ngModel)]="searchQuery" 
              class="w-full md:w-64 px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search friends"
              (input)="filterFriends()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute right-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          <button class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition">
            Add Friend
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Friend Requests Card -->
        <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden">
          <div class="p-5 border-b border-gray-700">
            <h2 class="text-lg font-medium text-white">Friend Requests</h2>
          </div>
          
          <div class="p-5">
            <div *ngIf="friendRequests.length === 0" class="text-center py-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <p class="text-gray-400">No pending friend requests</p>
            </div>
            
            <div *ngFor="let request of friendRequests" class="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {{ request.username.charAt(0) | uppercase }}
                </div>
                <div class="ml-3">
                  <div class="text-white font-medium">{{ request.username }}</div>
                  <div class="text-xs text-gray-400">Rank #{{ request.stats.rank }}</div>
                </div>
              </div>
              
              <div class="flex space-x-2">
                <button class="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-md transition">
                  Accept
                </button>
                <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md transition">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Online Friends Card -->
        <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden">
          <div class="p-5 border-b border-gray-700">
            <h2 class="text-lg font-medium text-white">Online Friends</h2>
          </div>
          
          <div class="p-5">
            <div *ngIf="getOnlineFriends().length === 0" class="text-center py-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <p class="text-gray-400">No friends online</p>
            </div>
            
            <div *ngFor="let friend of getOnlineFriends()" class="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
              <div class="flex items-center">
                <div class="relative">
                  <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {{ friend.username.charAt(0) | uppercase }}
                  </div>
                  <div class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#1c2128]"></div>
                </div>
                <div class="ml-3">
                  <div class="text-white font-medium">{{ friend.username }}</div>
                  <div class="text-xs text-gray-400">{{ friend.stats.challengesCompleted }} challenges completed</div>
                </div>
              </div>
              
              <div>
                <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md transition">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Friend Suggestions Card -->
        <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden">
          <div class="p-5 border-b border-gray-700">
            <h2 class="text-lg font-medium text-white">Suggested Friends</h2>
          </div>
          
          <div class="p-5">
            <div *ngFor="let suggestion of friendSuggestions" class="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {{ suggestion.username.charAt(0) | uppercase }}
                </div>
                <div class="ml-3">
                  <div class="text-white font-medium">{{ suggestion.username }}</div>
                  <div class="text-xs text-gray-400">Rank #{{ suggestion.stats.rank }}</div>
                </div>
              </div>
              
              <div>
                <button class="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-md transition">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- All Friends List -->
      <div class="mt-6 bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden">
        <div class="p-5 border-b border-gray-700 flex justify-between items-center">
          <h2 class="text-lg font-medium text-white">All Friends</h2>
          <div class="text-sm text-gray-400">{{ filteredFriends.length }} friends</div>
        </div>
        
        

        
        <div class="p-5">
          <div *ngIf="filteredFriends.length === 0" class="text-center py-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <p class="text-gray-400">No friends found</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let friend of filteredFriends" class="bg-[#0d1117] rounded-lg p-4 flex items-center justify-between">
              <div class="flex items-center">
                <div class="relative">
                  <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {{ friend.username.charAt(0) | uppercase }}
                  </div>
                  <div *ngIf="friend.status === 'online'" class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0d1117]"></div>
                  <div *ngIf="friend.status === 'away'" class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-yellow-500 border-2 border-[#0d1117]"></div>
                </div>
                <div class="ml-3">
                  <div class="text-white font-medium">{{ friend.username }}</div>
                  <div class="text-xs text-gray-400">
                    <span *ngIf="friend.status === 'online'">Online</span>
                    <span *ngIf="friend.status === 'away'">Away</span>
                    <span *ngIf="friend.status === 'offline'">Last seen {{ friend.lastActive | date }}</span>
                  </div>
                </div>
              </div>
              
              <div class="flex space-x-2">
                <button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
                <button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FriendsComponent implements OnInit {
  searchQuery = ""

  // Mock data
  friendRequests: Friend[] = [
    {
      id: 101,
      username: "tech_explorer",
      status: "online",
      stats: {
        rank: 9,
        challengesCompleted: 59,
      },
    },
    {
      id: 102,
      username: "byte_builder",
      status: "offline",
      lastActive: new Date("2023-05-10"),
      stats: {
        rank: 10,
        challengesCompleted: 57,
      },
    },
  ]

  friends: Friend[] = [
    {
      id: 1,
      username: "coding_master",
      status: "online",
      stats: {
        rank: 3,
        challengesCompleted: 74,
      },
    },
    {
      id: 2,
      username: "alice_wonder",
      status: "away",
      lastActive: new Date("2023-05-15"),
      stats: {
        rank: 2,
        challengesCompleted: 79,
      },
    },
    {
      id: 3,
      username: "dev_ninja",
      status: "online",
      stats: {
        rank: 4,
        challengesCompleted: 71,
      },
    },
    {
      id: 4,
      username: "bug_hunter",
      status: "offline",
      lastActive: new Date("2023-05-14"),
      stats: {
        rank: 5,
        challengesCompleted: 68,
      },
    },
    {
      id: 5,
      username: "syntax_error",
      status: "offline",
      lastActive: new Date("2023-05-13"),
      stats: {
        rank: 6,
        challengesCompleted: 65,
      },
    },
    {
      id: 6,
      username: "code_wizard",
      status: "online",
      stats: {
        rank: 7,
        challengesCompleted: 63,
      },
    },
  ]

  friendSuggestions: Friend[] = [
    {
      id: 201,
      username: "algorithm_guru",
      status: "online",
      stats: {
        rank: 8,
        challengesCompleted: 61,
      },
    },
    {
      id: 202,
      username: "data_scientist",
      status: "offline",
      lastActive: new Date("2023-05-12"),
      stats: {
        rank: 15,
        challengesCompleted: 45,
      },
    },
    {
      id: 203,
      username: "web_master",
      status: "online",
      stats: {
        rank: 20,
        challengesCompleted: 38,
      },
    },
  ]

  filteredFriends: Friend[] = []

  ngOnInit(): void {
    this.filteredFriends = [...this.friends]
  }

  filterFriends(): void {
    if (!this.searchQuery) {
      this.filteredFriends = [...this.friends]
      return
    }

    const query = this.searchQuery.toLowerCase()
    this.filteredFriends = this.friends.filter((friend) => friend.username.toLowerCase().includes(query))
  }

  getOnlineFriends(): Friend[] {
    return this.friends.filter((friend) => friend.status === "online")
  }
}

