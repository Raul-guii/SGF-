import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['USER', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.userService.createUser(this.form.value).subscribe({
      next: () => {
        alert('Usuário criado com sucesso');
        this.form.reset({ role: 'USER' });
      },
      error: () => alert('Erro ao criar usuário')
    });
  }
}