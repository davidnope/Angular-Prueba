export interface Users{
    id: number,
    name: string
    email: string,
    password: string,
}

export interface CrearUsersDto extends Omit<Users, 'id'>{}

export interface LoginUsersDto extends Omit<Users, 'id'|'name'>{}