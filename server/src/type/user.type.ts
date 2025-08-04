import { Role } from "@prisma/client";

export interface IUserData {
    id: number;
    name:string,
    email: string;
    role: Role;
    organizationName?: string
}

