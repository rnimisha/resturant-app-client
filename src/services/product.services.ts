import { type AxiosError, type AxiosResponse } from "axios";
import api from ".";
import { type ProductType } from "../utils/interface/interface";
import APIROUTES from "../constant/apiRoutes";
import { getErrorResponse } from "../utils/common";


export const getProducts = async (filter: ProductType): Promise<AxiosResponse<ProductType[]>> =>{

    try{
        const page = filter.page || 1
        const response = await api.get(`${APIROUTES.PRODUCTS}?page=${page}`)
        return response.data
    
    }catch(error)
    {
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err));
    }

}