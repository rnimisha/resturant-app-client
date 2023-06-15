
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

export interface ProductType {
    product_id?: number,
    name?: string,
    quantity?: number,
    minPrice?: number,
    maxPrice?: number,
    category_id?: number | number[],
    price?: number,
    unit?: string,
    page?: number,
    description?: string,
    images?: string[],
    image?: string
}

export interface ProductInfo {
    product : ProductType[],
    total: number
}

export interface CartItem {
    cart_id? : number,
    product_id: number,
    cart_prod_quantity: number,
    user_id?: number,
    price?: number,
    name?: string,
    prod_quantity?: number
}

export interface Carts {
    products : CartItem[] | []
}

export interface CategoryItem{
    category_id: number,
    category_name: string,
    image? : string
}

export interface Products {
    product_id: number
    quantity: number
    price?: number
    name?: string
}

export interface OrderType {
    order_id?: number
    user_id: number
    order_date?: string 
    order_status: string 
    payment_method: string
    paid: 'F' | 'T'
    products?: Products[]
}

export interface optionVal {
    option: string,
    value: number | string
}


export type CheckedCategories = Record<number, string>;