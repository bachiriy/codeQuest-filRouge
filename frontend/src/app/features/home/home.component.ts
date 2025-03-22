import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen text-gray-300">
      <!-- Hero Section -->
      <section class="relative py-20 md:py-32 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-[#1a1d29] to-[#111827] z-0"></div>
        <div class="absolute inset-0 bg-[url('/assets/grid-pattern.png')] opacity-30 z-0"></div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="flex flex-col lg:flex-row items-center">
            <div class="lg:w-1/2 mb-10 lg:mb-0">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Master <span class="text-blue-500">coding challenges</span> and level up your skills
              </h1>
              <p class="text-xl text-gray-300 mb-8">
                Join Code Quest — the most immersive platform to practice programming, compete with friends, 
                and build your developer portfolio through interactive coding challenges.
              </p>
              <div class="flex flex-wrap gap-4">
                <a routerLink="/auth/register" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition shadow-lg hover:shadow-xl">
                  Get Started Free
                </a>
                <a routerLink="/challenges" class="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md transition border border-gray-700">
                  Explore Challenges
                </a>
              </div>
            </div>
            <div class="lg:w-1/2 lg:pl-12">
              <div class="bg-[#1c2128] rounded-lg shadow-2xl p-6 border border-gray-700">
                <div class="flex items-center mb-4">
                  <div class="flex space-x-2">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div class="ml-4 text-gray-400 text-sm">challenge.js</div>
                </div>
                <pre class="bg-[#0d1117] p-4 rounded-md text-sm overflow-auto text-gray-300 font-mono">
<span class="text-purple-400">function</span> <span class="text-blue-400">twoSum</span>(<span class="text-orange-400">nums</span>, <span class="text-orange-400">target</span>) {
  <span class="text-purple-400">const</span> <span class="text-orange-400">map</span> = <span class="text-purple-400">new</span> <span class="text-blue-400">Map</span>();
  
  <span class="text-purple-400">for</span> (<span class="text-purple-400">let</span> <span class="text-orange-400">i</span> = <span class="text-green-400">0</span>; <span class="text-orange-400">i</span> < <span class="text-orange-400">nums</span>.length; <span class="text-orange-400">i</span>++) {
    <span class="text-purple-400">const</span> <span class="text-orange-400">complement</span> = <span class="text-orange-400">target</span> - <span class="text-orange-400">nums</span>[<span class="text-orange-400">i</span>];
    
    <span class="text-purple-400">if</span> (<span class="text-orange-400">map</span>.has(<span class="text-orange-400">complement</span>)) {
      <span class="text-purple-400">return</span> [<span class="text-orange-400">map</span>.get(<span class="text-orange-400">complement</span>), <span class="text-orange-400">i</span>];
    }
    
    <span class="text-orange-400">map</span>.set(<span class="text-orange-400">nums</span>[<span class="text-orange-400">i</span>], <span class="text-orange-400">i</span>);
  }
  
  <span class="text-purple-400">return</span> [];
}

<span class="text-green-400">// Test cases</span>
console.<span class="text-blue-400">log</span>(twoSum([<span class="text-green-400">2</span>, <span class="text-green-400">7</span>, <span class="text-green-400">11</span>, <span class="text-green-400">15</span>], <span class="text-green-400">9</span>)); <span class="text-gray-500">// [0, 1]</span>
console.<span class="text-blue-400">log</span>(twoSum([<span class="text-green-400">3</span>, <span class="text-green-400">2</span>, <span class="text-green-400">4</span>], <span class="text-green-400">6</span>));     <span class="text-gray-500">// [1, 2]</span>
</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="py-16 bg-[#161b22]">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-white mb-4">Level Up Your Coding Skills</h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Code Quest provides a fun, competitive environment to improve your programming prowess
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-[#1c2128] rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition shadow-lg hover:shadow-xl">
              <div class="bg-blue-600/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Compete with Friends</h3>
              <p class="text-gray-300">
                Form groups, challenge friends, and compare your solutions to see who can solve problems most efficiently.
              </p>
            </div>
            
            <div class="bg-[#1c2128] rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition shadow-lg hover:shadow-xl">
              <div class="bg-blue-600/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Track Your Progress</h3>
              <p class="text-gray-300">
                Monitor your improvement with detailed statistics, skill progression, and performance analytics.
              </p>
            </div>
            
            <div class="bg-[#1c2128] rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition shadow-lg hover:shadow-xl">
              <div class="bg-blue-600/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Earn Rewards</h3>
              <p class="text-gray-300">
                Solve challenges, collect points, and climb the leaderboard to unlock achievements and badges.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Stats Section -->
      <section class="py-16 bg-[#0d1117]">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-3xl md:text-4xl font-bold text-blue-500 mb-2">500+</div>
              <div class="text-gray-300 text-lg">Coding Challenges</div>
            </div>
            <div>
              <div class="text-3xl md:text-4xl font-bold text-blue-500 mb-2">10K+</div>
              <div class="text-gray-300 text-lg">Active Users</div>
            </div>
            <div>
              <div class="text-3xl md:text-4xl font-bold text-blue-500 mb-2">6</div>
              <div class="text-gray-300 text-lg">Programming Languages</div>
            </div>
            <div>
              <div class="text-3xl md:text-4xl font-bold text-blue-500 mb-2">24/7</div>
              <div class="text-gray-300 text-lg">Community Support</div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section class="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to level up your coding skills?</h2>
          <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of developers who are improving their programming skills and having fun at the same time.
          </p>
          <a routerLink="/auth/register" class="px-8 py-4 bg-white text-blue-600 font-bold rounded-md text-lg hover:bg-gray-100 transition shadow-lg">
            Create Free Account
          </a>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent {}

