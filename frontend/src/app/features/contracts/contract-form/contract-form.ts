import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contract-form.html',
  styleUrl: './contract-form.css',
})
export class ContractForm {

}
