import { Component } from "@angular/core";
import { AuthService } from "@app/core/services/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout().subscribe();
  }
} 