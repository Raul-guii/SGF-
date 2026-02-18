export interface User{
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    role: string;
}

export interface UpdateUser{
    name: string;
    phone: string;
}

export interface ChangePassword{
    currentPassword: string;
    newPassword: string;
}