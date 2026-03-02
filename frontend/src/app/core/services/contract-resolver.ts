import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ContractService } from '../services/contract.service';
import { Contract } from '../models/contract.model';

@Injectable({ providedIn: 'root' })
export class ContractsResolver implements Resolve<Contract[]> {

  constructor(private contractService: ContractService) {}

  resolve(): Observable<Contract[]> {
    return this.contractService.findAll();
  }

}