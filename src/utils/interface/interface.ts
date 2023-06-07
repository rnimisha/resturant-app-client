
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

interface FieldError{
    field: string,
    description: string
}

export interface ErrorResponse {
    status: boolean,
    msg: string,
    fieldError?: [] | FieldError[]
}

export interface allResponse {
    success : boolean,
    data: any
}