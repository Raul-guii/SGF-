import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
    isAdmin = false;

  constructor(private authService: AuthService) {

    const role = this.authService.getUserRole();

    console.log('ROLE DO TOKEN:', role); 

    this.isAdmin = role === 'ROLE_ADMIN';
  }

  logout(){
    this.authService.logout();
  }
}

