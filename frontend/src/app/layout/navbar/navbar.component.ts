import { Component, inject } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
