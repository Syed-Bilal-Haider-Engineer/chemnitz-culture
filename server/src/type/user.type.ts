export interface IUserData {
    name:string,
    email: string;
    location: string;
    role: Role
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin'
}