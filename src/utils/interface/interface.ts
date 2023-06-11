
export interface User{
    user_id?: number | null
    email: string 
    name?: string
    token?: string 
    role?: 'C' | 'A' ,
    address?: string
    phone?: string,
    password?: string
}

export interface FieldError{
    field: string,
    description: string
}

export interface ErrorResponse {
    success: boolean,
    msg: string,
    fieldError?: [] | FieldError[]
}

export interface allResponse {
    success : boolean,
    data: any
}

export interface userError {
    user_id?: string
    email?: string 
    name?: string
    token?: string 
    role?: string ,
    address?: string
    phone?: string,
    password?: string
}

export interface RegisterUser{
    email: string 
    name: string
    role: 'C' | 'A' ,
    address: string
    phone: string,
    password: string,
    confirmpass?: string
}