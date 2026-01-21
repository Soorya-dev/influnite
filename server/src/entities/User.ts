export type UserRole = "influencer" | "business" | "admin";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    password?: string; // Optional because we might not pass it around everywhere
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}
