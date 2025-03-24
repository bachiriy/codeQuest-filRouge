import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <main class="min-h-screen bg-[#0d1117] text-white">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'my-v0-project';
} 