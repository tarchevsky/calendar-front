export enum UserRole {
    User = 'USER',
    Admin = 'ADMIN',
}

export interface IUser {
    id: number
    name?: string
    email: string
    role: UserRole
}

export interface IAuthFormData extends Pick<IUser, 'email'> {
    password: string
}