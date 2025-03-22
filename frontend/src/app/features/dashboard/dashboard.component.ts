import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { selectUser } from "../../core/store/auth/auth.selectors"
import type { User } from "../../core/models/user.model"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  user$: Observable<User | null>

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser)
  }

  ngOnInit(): void {
    // Any initialization logic
  }
}

