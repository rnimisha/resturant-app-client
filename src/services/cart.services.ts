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