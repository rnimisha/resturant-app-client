import { type AxiosError, type AxiosResponse } from "axios";
import { getErrorResponse } from "../utils/common";
import { type UpdateOrder, type AllOrderInfo, type OrderType } from "../utils/interface/interface";
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

export const getAllOrders = async(status: string): Promise<AxiosResponse<AllOrderInfo>> =>{
    try{
        
        const response = await api.get(`${APIROUTES.ORDER}/all?status=${status}`)
        return response.data

    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))
    }
}

export const updateOrderStatus = async(data: UpdateOrder): Promise<AxiosResponse<{order_status: string}>> =>{
    try{
        
        const response = await api.put(`${APIROUTES.ORDER}/status`, {order_id: data.order_id, status: data.order_status})
        return response.data

    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))
    }
}

export const getOrderDetailById = async(id: number): Promise<AxiosResponse<OrderType>> =>{
    try{
        
        const response = await api.get(`${APIROUTES.ORDER}/${id}`)
        return response.data

    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))
    }
}

