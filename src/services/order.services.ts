import { type AxiosError, type AxiosResponse } from "axios";
import { getErrorResponse } from "../utils/common";
import { type OrderType } from "../utils/interface/interface";
import api from ".";
import APIROUTES from "../constant/apiRoutes";

export const placeOrder = async(data: OrderType): Promise<AxiosResponse<{order_id: number}>> =>{

    try{
        
        const response = await api.post(APIROUTES.ORDER, {...data})
        return response.data

    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))
    }

}