import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-main-layouts.component',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, NavbarComponent],
  templateUrl: './main-layouts.component.html',
  styleUrl: './main-layouts.component.css',
})
export class MainLayoutsComponent {

  isSideBarOpen = true;

  toggleSidebar(){
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
