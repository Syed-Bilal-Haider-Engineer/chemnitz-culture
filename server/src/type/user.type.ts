export interface IUserData {
    name:string,
    email: string;
    location: string;
    role: Role
}

enum Role {
    USER,
    ADMIN
}