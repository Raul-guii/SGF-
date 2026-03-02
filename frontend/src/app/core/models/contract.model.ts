import { ContractStatus } from "../enums/contract-status.enum";

export interface Contract {
  id: number;
  description: string;
  valueMonthly: number; 
  dateStart: string; 
  dateEnd: string;
  dueDay: number;

  user: {
    id: number;
    name?: string;
    email?: string;
  };

  contractStatus: ContractStatus;
}

export interface CreateContractRequest{
    description: string;
    valueMonthly: number;
    dueDay: number;
    dateStart: string;
    dateEnd: string;
}

export interface UpdateContractRequest{
    valueMonthly?: number;
    dueDay?: number;
    dateEnd?: string;
    description?: string;
    contractStatus?: ContractStatus;
}