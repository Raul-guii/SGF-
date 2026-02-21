import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-access-denied.page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './access-denied.page.html',
  styleUrl: './access-denied.page.css',
})
export class AccessDeniedPage {

}
