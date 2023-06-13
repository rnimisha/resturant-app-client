import { type AxiosError, type AxiosResponse } from "axios";
import { type CartItem } from "../utils/interface/interface";
import { getErrorResponse } from "../utils/common";
import api from ".";
import APIROUTES from "../constant/apiRoutes";


export const getCartProducts = async (userId : number): Promise<AxiosResponse<CartItem[]>>=>{

    try{
        const response = await api.get(`${APIROUTES.CART}/${userId}`)
        return response.data

    }catch(error){

        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))

    }

}

export const addToCart = async (data: CartItem): Promise<AxiosResponse<CartItem>> =>{

    try{
        const response = await api.post(APIROUTES.CART, {
            product_id : data.product_id, cart_prod_quantity: data.cart_prod_quantity, user_id: data.user_id
        })
        return response.data
        
    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))
    }
}


export const updateCart = async( cart_id: number , cart_prod_quantity: number ) : Promise<AxiosResponse<CartItem>> =>{

    try{
        const response = await api.put(APIROUTES.CART, {
            cart_id,  cart_prod_quantity
        })

        // console.log('debounce quantity')
        return response.data

    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))
    }
}

export const deleteCartProduct = async( cart_id: number, user_id: number) : Promise<AxiosResponse<boolean>> =>{
    try{
        const response = await api.delete(APIROUTES.CART, {data: {cart_id, user_id}})

        return response.data

    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))
    }
}