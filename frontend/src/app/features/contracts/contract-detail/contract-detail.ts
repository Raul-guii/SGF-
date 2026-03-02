import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contract-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contract-detail.html',
  styleUrl: './contract-detail.css',
})
export class ContractDetail {

}
