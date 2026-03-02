import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {

  users: User[] = [];

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      if (data['users']) {
        this.users = data['users'];
      } else {
        this.loadUsers();
      }
    });

  }

  loadUsers() {
    this.userService.listUsers().subscribe({
      next: (data) => {
        console.log("USUARIOS RECEBIDOS:", data);
        this.users = data;
      },
      error: () => alert('Erro ao carregar usuários')
    });
  }

  delete(id: number) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        alert('Usuário deletado com sucesso!');
        this.users = this.users.filter(user => user.id !== id);
      }
    });
  }
}