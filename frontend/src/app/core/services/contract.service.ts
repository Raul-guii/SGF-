import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Contract, CreateContractRequest, UpdateContractRequest } from '../models/contract.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ContractService {

  private readonly API = `${environment.apiUrl}/contracts`;

  constructor(private http: HttpClient) {}

  // LISTAR (ADMIN)
  findAll(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.API);
  }

  // BUSCAR POR ID (ADMIN e USER)
  getById(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.API}/${id}`);
  }

  // CRIAR (ADMIN)
  create(userId: number, data: CreateContractRequest): Observable<Contract> {
    return this.http.post<Contract>(`${this.API}/user/${userId}`, data);
  }

  // ATUALIZAR (ADMIN)
  update(contractId: number, data: UpdateContractRequest): Observable<Contract> {
    return this.http.put<Contract>(`${this.API}/${contractId}`, data);
  }

  // CANCELAR (ADMIN e USER)
  cancel(contractId: number): Observable<void> {
    return this.http.patch<void>(`${this.API}/${contractId}/cancel`, {});
  }
}

