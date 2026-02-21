import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-list.component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  errorMessage = '';
  pendingDeleteId: number | null = null;
  deletingId: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.listUsers().subscribe({
      next: (users) => {
        this.users = users.filter((user) => !this.isAdminUser(user));
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Nao foi possivel carregar a lista de usuarios.';
        this.isLoading = false;
      }
    });
  }

  requestDelete(userId: number): void {
    this.pendingDeleteId = userId;
  }

  cancelDelete(): void {
    this.pendingDeleteId = null;
  }

  deleteUser(userId: number): void {
    const targetUser = this.users.find((user) => user.id === userId);
    if (targetUser && this.isAdminUser(targetUser)) {
      this.errorMessage = 'Usuario admin nao pode ser excluido.';
      return;
    }

    const confirmed = window.confirm('Confirmacao final: deseja realmente excluir este usuario?');
    if (!confirmed) return;

    this.deletingId = userId;

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
        this.pendingDeleteId = null;
        this.deletingId = null;
      },
      error: () => {
        this.errorMessage = 'Erro ao excluir usuario.';
        this.deletingId = null;
      }
    });
  }

  trackByUserId(_: number, user: User): number {
    return user.id;
  }

  private isAdminUser(user: User): boolean {
    const role = (user.role || '').toUpperCase();
    return role === 'ROLE_ADMIN' || role === 'ADMIN';
  }

}
