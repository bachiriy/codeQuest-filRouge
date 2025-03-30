import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { selectUser } from "../../core/store/auth/auth.selectors"
import type { User } from "../../core/models/user.model"
import { AuthService } from "../../core/services/auth.service"

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null>
  profile$ = this.authService.getProfile();

  constructor(private store: Store, private authService: AuthService) {
    this.user$ = this.store.select(selectUser)
  }

  updateProfile(): void {
      // TODO: implement profile update 
      console.log('updating profile...');
  }

  ngOnInit(): void {
    // Any initialization logic
  }
}

