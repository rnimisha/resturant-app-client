import { type AxiosError, type AxiosResponse } from "axios";
import api from ".";
import { type ProductInfo, type ProductType } from "../utils/interface/interface";
import APIROUTES from "../constant/apiRoutes";
import { getErrorResponse } from "../utils/common";


export const getProducts = async (filter: ProductType): Promise<AxiosResponse<ProductInfo>> =>{

    try{
        const page = filter.page  || 1 

        let endpoint = `${APIROUTES.PRODUCTS}?page=${page}`

        endpoint = filter.minPrice ? `${endpoint}&minPrice=${filter.minPrice}` : endpoint
        endpoint = filter.maxPrice ? `${endpoint}&maxPrice=${filter.maxPrice}` : endpoint

        endpoint = filter.orderBy ? `${endpoint}&order=${filter.orderBy}` : endpoint

        if(filter.category_id){
            const categories = filter.category_id as number[]
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            endpoint = categories.length > 0 ? `${endpoint}&categories=${categories}` : endpoint
        }
        
        console.log('call')
        const response = await api.get(endpoint)
        return response.data
    
    }catch(error)
    {
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err));
    }

}

export const getMinMaxPrice = async (): Promise<AxiosResponse<{minPrice: number, maxPrice:number}>> =>{

    try{
        const resp = await api.get(`${APIROUTES.PRODUCTS}/minmaxprice`)
        return resp.data
    }catch(error)
    {
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err));
    }

}

export const getProductById = async (id: number): Promise<AxiosResponse<ProductType>> =>{
    
    try{
        const resp = await api.get(`${APIROUTES.PRODUCTS}/${id}`)
        return resp.data

    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err));
    }
    
}

export const updateProduct = async (data: ProductType): Promise<AxiosResponse<ProductType>> =>{
    try{
        const resp = await api.put(APIROUTES.PRODUCTS , data)
        return resp.data

    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err));
    }
}

export const deleteProduct = async (id: number): Promise<AxiosResponse<boolean>> =>{
    try{
        const resp = await api.delete(`${APIROUTES.PRODUCTS}/${id}` )
        return resp.data.success

    }catch(error){
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err));
    }
}

export const addNewProduct = async (data: any): Promise<AxiosResponse<ProductType>> =>{
    try{
        const resp = await api.post(APIROUTES.PRODUCTS, data)
        console.log(resp)
        return resp.data

    }catch(error){
        console.log(error)
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err));
    }
}