import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css'
})
export class UserEditComponent implements OnInit {

  form!: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

  }

  submit() {
  if (this.form.invalid) return;

  this.userService.updateUser(this.userId, this.form.value).subscribe({
    next: () => alert('Usuário atualizado com sucesso'),
    error: () => alert('Erro ao atualizar usuário')
  });
  }

}