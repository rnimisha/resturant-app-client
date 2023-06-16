import { type AxiosError } from "axios";
import APIROUTES from "../constant/apiRoutes";
import { getErrorResponse } from "../utils/common";
import { type AnalyticsCountType } from "../utils/interface/interface";
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