import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { selectIsAuthenticated, selectUser } from "../../store/auth/auth.selectors"
import { logout } from "../../store/auth/auth.actions"
import type { User } from "../../models/user.model"

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean>
  user$: Observable<User | null>

  constructor(private store: Store) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
    this.user$ = this.store.select(selectUser)
  }

  onLogout(): void {
    this.store.dispatch(logout())
  }
}
