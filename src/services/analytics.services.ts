import { type AxiosError } from "axios";
import APIROUTES from "../constant/apiRoutes";
import { getErrorResponse } from "../utils/common";
import { type RevenuePerMonth, type AnalyticsCountType, type RevenuePerCategory } from "../utils/interface/interface";
import api from ".";


export const getCountAnalytics = async (): Promise<AnalyticsCountType[]> =>{

    try{
        const response = await api.get(`${APIROUTES.ANALYTICS}/counts`)
        return response.data.data

    }catch(error){

        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))

    }
}

export const getRevenuePerMonth = async (): Promise<RevenuePerMonth[]> =>{

    try{
        const response = await api.get(`${APIROUTES.ANALYTICS}/revenuepermonth`)
        return response.data.data

    }catch(error){

        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))

    }
}

export const getRevenuePerCategory = async (): Promise<RevenuePerCategory[]> =>{

    try{
        const response = await api.get(`${APIROUTES.ANALYTICS}/revenuepercategory`)
        return response.data.data

    }catch(error){

        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))

    }
}