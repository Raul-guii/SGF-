import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Register } from '../../../models/auth.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users-form.component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
})
export class UsersFormComponent {
  form: Register = {
    name: '',
    email: '',
    password: '',
    cpf: '',
    phone: '',
  };

  confirmPassword = '';
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.isSubmitting) return;

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting = true;

    this.authService.register(this.form).subscribe({
      next: () => {
        this.successMessage = 'Usuario cadastrado com sucesso.';
        this.isSubmitting = false;
        this.resetForm();
        this.router.navigate(['/admin/users']);
      },
      error: () => {
        this.errorMessage = 'Nao foi possivel cadastrar o usuario.';
        this.isSubmitting = false;
      },
    });
  }

  private isFormValid(): boolean {
    if (
      !this.form.name.trim() ||
      !this.form.email.trim() ||
      !this.form.password ||
      !this.form.cpf.trim() ||
      !this.form.phone.trim()
    ) {
      this.errorMessage = 'Preencha todos os campos obrigatorios.';
      return false;
    }

    if (this.form.password.length < 6) {
      this.errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      return false;
    }

    if (this.form.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas nao conferem.';
      return false;
    }

    return true;
  }

  private resetForm(): void {
    this.form = {
      name: '',
      email: '',
      password: '',
      cpf: '',
      phone: '',
    };
    this.confirmPassword = '';
  }

}
