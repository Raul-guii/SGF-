import { Role } from "./role.type";

export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    role: Role;
}

export interface UpdateUserRequest{
    name: string;
    phone: string;
}

export interface ChangePasswordRequest{
    currentPassword: string;
    newPassword: string;
}