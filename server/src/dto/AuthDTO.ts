import { UserRole } from "../entities/User.js";

export interface RegisterUserRequestDTO {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface LoginUserRequestDTO {
    email: string;
    password: string;
}

export interface UserResponseDTO {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}
