import { type AxiosError, type AxiosResponse } from "axios";
import { getErrorResponse } from "../utils/common";
import api from ".";
import APIROUTES from "../constant/apiRoutes";
import { type CategoryItem } from "../utils/interface/interface";


export const getCategory = async (): Promise<AxiosResponse<CategoryItem[]>> =>{

    try{

        const response = await api.get(APIROUTES.CATEGORY)
        return response.data

    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err))
    }

    
}