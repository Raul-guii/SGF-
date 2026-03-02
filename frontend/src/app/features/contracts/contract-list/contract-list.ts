import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contract } from '../../../core/models/contract.model';
import { ContractService } from '../../../core/services/contract.service';
import { ContractStatus } from '../../../core/enums/contract-status.enum';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contract-list.html',
  styleUrl: './contract-list.css',
})
export class ContractList implements OnInit {

  contracts: Contract[] = [];
  loading = true;
  error = false;

  ContractStatus = ContractStatus;

  constructor(private contractService: ContractService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    console.log("COMPONENTE CONTRACT LIST INICIADO");

    this.contracts = this.route.snapshot.data['contracts'];

    console.log("CONTRATOS RECEBIDOS:", this.contracts);

    this.loading = false;

  }

  loadContracts() {
    this.contractService.findAll().subscribe({
      next: (data) => {
        console.log("CONTRATOS RECEBIDOS:", data);
        this.contracts = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  cancelContract(id: number) {
    if (!confirm('Deseja realmente cancelar este contrato?')) return;

    this.contractService.cancel(id).subscribe({
      next: () => {
        this.loadContracts();
      }
    });
  }

  canCancel(status: ContractStatus): boolean {
    return status !== ContractStatus.CANCELLED &&
           status !== ContractStatus.EXPIRED;
  }

}
